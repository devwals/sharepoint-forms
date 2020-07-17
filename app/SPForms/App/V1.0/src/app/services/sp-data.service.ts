import { Injectable } from '@angular/core';
import { sp, SPRequestExecutorClient, SPRestAddIn } from "@pnp/sp-addinhelpers";
import { UtilityMethod } from "@pnp/sp";
import { taxonomy, ITermStore, ITermSet, ITerms, ITermData, ITerm } from "@pnp/sp-taxonomy";
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { IDataService } from './interfaces/idata-service';
import { from, Observable } from 'rxjs';


declare var SP: any;//Fix for error TS2304: Cannot find name 'SP'
@Injectable({
  providedIn: 'root'
})
export class SPDataService implements IDataService {
  public addInWenUrl = this.getParameterByName("SPAppWebUrl", location.href);
  public hostWebUrl = this.getParameterByName("SPHostUrl", location.href);
  public context = sp;
  private spLoaded = 0;

  listExclusions = [
    "Composed Looks",
    "Apps in Testing",
    "Form Templates",
    "MicroFeed",
    "Style Library",
    "App Packages",
    "Site Pages",
    "Content and Structure Reports",
    "Devwals Forms",
    "Reusable Content",
    "Pages",
    "Data Connection"
  ];

  fieldExclusionsList = [
    "ComplianceAssetId",
    "AppEditor",
    "_ComplianceFlags",
    "_CopySource",
    "ParentLeafName",
    "ParentVersionString",
    "Edit",
    "_IsRecord",
    "_ComplianceTagUserId",
    "_ComplianceTagWrittenTime",
    "_ComplianceTag",
    "_OriginalSourceItemId",
    "_OriginalSourceUrl",
    "_OriginalSourceSiteId",
    "_OriginalSourceListId",
    "_OriginalSourceItemId",
    "_DisplayName",
    "_LikeCount",
    "ItemChildCount",
    "FolderChildCount",
    "_CommentCount",
    "AppAuthor",
    "LinkTitleNoMenu",
    "LinkTitle",
    "DocIcon",
    "_UIVersionString",
    "Attachments",
    "ContentType",
    "LinkFilenameNoMenu",
    "LinkFilename",
    "PublishingExpirationDate",
    "PublishingStartDate",
    "FileSizeDisplay",
    "CheckoutUser",
    "_CheckinComment",
    "Task_x0020_Outcome"
  ];

  productLicense = undefined;
  productId = 'c765d60b-b380-420e-a73b-159b7d235de1';
  verificationService = 'https://verificationservice.officeapps.live.com/ova/verificationagent.svc/rest/verify';

  constructor(private http: HttpClient, private ngxXml2jsonService: NgxXml2jsonService) {
  }

  private getHostServerRelativeUrl() {
    let url = new URL(this.hostWebUrl);
    // console.log(url.href.substr(url.href.indexOf(url.origin) + url.origin.length));
    return url.href.substr(url.href.indexOf(url.origin) + url.origin.length);
  }

  loadSP(): Promise<any> {
    if (this.spLoaded == 0) {
      return new Promise((resolve, reject) => {
        resolve(sp);
      });
    } else {
      return new Promise((resolve, reject) => {
        $.getScript(this.hostWebUrl + "/_layouts/15/SP.RequestExecutor.js").bind(this)
          .done(function (script, textStatus) {
            sp.setup({
              sp: {
                fetchClientFactory: () => {
                  return new SPRequestExecutorClient();
                },
                headers: {
                  Accept: 'application/json; odata=nometadata'
                }
              }
            });

            // sp.configure({
            //   headers: {
            //     Accept: 'application/json; odata=nometadata'
            //  }
            // });

            this.spLoaded = true;
            resolve(sp);

          })
          .fail(function (jqxhr, settings, exception) {
            this.spLoaded = false;
            reject(exception);
          });
      });
    }
  }

  cdWeb() {
    return sp.crossDomainWeb(this.addInWenUrl, this.hostWebUrl);
  }

  getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  getLicense(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.productLicense != undefined) {
        resolve(this.productLicense);
        return;
      }

      var method = new UtilityMethod("", "GetAppLicenseInformation");
      //ref: https://github.com/pnp/pnpjs/blob/dev/packages/sp/docs/sp-utilities-utility.md
      method.excute<string>({
        productId: this.productId
      }).then((r: any) => {
        // console.log(r);
        if (r.Items && r.Items.length > 0) {
          var licenseRequestUrl = `${this.verificationService}?token=${encodeURIComponent(r.Items[0].RawXMLLicenseToken)}`;
          var proxy = `${this.addInWenUrl}/_api/SP.WebProxy.invoke`;
          var proxyRequestData = {
            "requestInfo": {
              "__metadata": { "type": "SP.WebRequestInfo" },
              "Url": licenseRequestUrl,
              "Method": "GET",
              "Headers": {
                "results": [{
                  "__metadata": { "type": "SP.KeyValue" },
                  "Key": "Accept",
                  "Value": "application/json;odata=verbose",
                  "ValueType": "Edm.String"
                }
                ]
              }
            }
          };

          this.getCurrentWebContext().then(r => {
            // console.log(r);
            var header = {
              headers: {
                "Accept": "application/json;odata=verbose",
                "Content-Type": "application/json;odata=verbose",
                "X-RequestDigest": r.d.GetContextWebInformation.FormDigestValue
              }
            };
            this.http.post(proxy, proxyRequestData, header).subscribe(d => {
              var parser = new DOMParser();
              var xml = parser.parseFromString(d["d"].Invoke.Body, 'text/xml');
              var obj = this.ngxXml2jsonService.xmlToJson(xml);
              this.productLicense = obj;
              resolve(obj);
            },
              e => {
                reject(e);
              });
          }).catch(e => {
            console.log("Error loading context");
            reject(e);
          });
        } else {
          this.productLicense = undefined;
          resolve({});
        }
      }).catch(e => {
        reject(e);
      });

    });

  }

  getCurrentWebContext(): Promise<any> {
    var requestUrl = `${this.addInWenUrl}/_api/contextinfo`;
    var header = {
      headers: {
        "Accept": "application/json;odata=verbose",
        "Content-Type": "application/json;odata=verbose",
      }
    };

    return new Promise((resolve, reject) => {
      this.http.post(requestUrl, {}, header).subscribe(r => {
        resolve(r);
      },
        e => {
          reject(e);
        });
    });

  }

  isLicenseValid(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.productLicense == undefined) {
        this.getLicense().then(l => {
          if (l) {
            return this.isLicenseValid();
          } else {
            reject("isLicenseValid()::Failed to obtain the product license. Please contact your System Administrator for a resolution.");
          }
        });
      } else if (this.productLicense["VerifyEntitlementTokenResponse"].IsTest == "true"
        || this.productLicense["VerifyEntitlementTokenResponse"].IsValid == "true") {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }

  getLicenseType() {
    return new Promise((resolve, reject) => {
      if (this.productLicense == undefined) {
        this.getLicense().then(l => {
          if (l) {
            return this.getLicenseType();
          } else {
            reject("getLicenseType()::Failed to obtain the product license. Please contact your System Administrator for a resolution.");
          }
        });
      } else {
        resolve(this.productLicense["VerifyEntitlementTokenResponse"].EntitlementType);
      }
    });
  }

  getListForms(Id) {
    return new Promise((resolve, reject) => {
      this.loadSP().then(r => {
        this.cdWeb().lists.getById(Id).forms.get().then(r1 => {
          resolve(r1);
        }, (e1) => {
          reject(e1);
        });
      }, (e) => {
        reject(e);
      });
    });
  }

  saveListForms(param) {
    return new Promise((resolve, reject) => {
      let clientContext = SP.ClientContext.get_current();
      let hostcontext = new SP.AppContextSite(clientContext, this.hostWebUrl);

      let oList = hostcontext.get_web().get_lists().getById(param.Id);
      let ct = oList.get_contentTypes();
      clientContext.load(oList);
      clientContext.load(ct);

      clientContext.executeQueryAsync(
        function () {

          let ctEnumerator = ct.getEnumerator();

          while (ctEnumerator.moveNext()) {
            let currentCT = ctEnumerator.get_current();
            const contentType = param.ContentTypes.find(c => c.Name == currentCT.get_name());
            if (contentType && !contentType.Sealed) {
              currentCT.set_newFormUrl(contentType.NewFormUrl);
              currentCT.set_editFormUrl(contentType.EditFormUrl);
              currentCT.set_displayFormUrl(contentType.DisplayFormUrl);

              currentCT.update(false);
              // clientContext.executeQueryAsync(
              //   function () {
              //     console.log("updated");
              //     resolve("Form updated");
              //   },
              //   function (sender, args) {
              //     console.log("error");
              //     console.log(sender);
              //     reject(args.get_message());
              //   });
            }
          }

          clientContext.executeQueryAsync(
            function () {
              resolve("Form updated");
            },
            function (sender, args) {
              reject(args.get_message());
            });
        },
        function (sender, args) {
          reject(args.get_message());
        });
    });
  }

  /*Get item from list / library
  */
  getItem(listId: string, id: number, isDocument?: boolean) {
    return new Promise((resolve, reject) => {
      this.loadSP().then(r => {
        (isDocument
          ? this.cdWeb().lists.getById(listId).items.getById(id).select("FileLeafRef,File,*").expand("File")
          : this.cdWeb().lists.getById(listId).items.getById(id))
          .get()
          .then(r1 => {
            resolve(r1);
          }, (e1) => {
            reject(e1);
          });
      }, (e) => {
        reject(e);
      });
    });
  }

  getLookupItemsByField(listId: string, field: string, value: any): Observable<any> {

    return from(new Promise((resolve, reject) => {
      this.loadSP().then(r => {
        (value && value.length > 0
          ? this.cdWeb().lists.getById(listId).items.filter(`substringof('${value}', ${field})`)
          : this.cdWeb().lists.getById(listId).items)
          .top(20)
          .get()
          .then(r1 => {
            resolve(r1);
          }, (e1) => {
            reject(e1);
          });
      }, (e) => {
        reject(e);
      });
    })
    );

  }

async getTermSetItems(sspId:string,termSetId:string,searchStr:string){
  const store: ITermStore = taxonomy.termStores.getById(sspId);
  const set:ITermSet = store.getTermSetById(termSetId);
  const terms:(ITermData & ITerm)[] = await set.terms.get();
  console.log(terms);
  return terms.filter(t=>t.Name.toLowerCase().indexOf(searchStr.toLowerCase()) != -1);
}  

  getItemsByFilter(listId: string, filter: any): Observable<any> {
    return from(new Promise((resolve, reject) => {
      this.loadSP().then(r => {
        this.cdWeb().lists.getById(listId).items
          .filter(filter)
          .get()
          .then(r1 => {
            resolve(r1);
          }, (e1) => {
            reject(e1);
          });
      }, (e) => {
        reject(e);
      });
    })
    );
  }

  getItemAttachments(listId: string, id: number) {
    return from(
      new Promise((resolve, reject) => {
        this.loadSP().then(r => {
          let item = this.cdWeb().lists.getById(listId).items.getById(id);
          item.attachmentFiles.get().then(f => {
            resolve(f);
          }, (e1) => {
            reject(e1);
          });
        }, (e) => {
          reject(e);
        });
      })
    );
  }

  saveLibrary(fileName: string, file, data: any, override?: boolean): Promise<any> {
    return new Promise((resolve, reject) => {
      this.loadSP().then(() => {
        var relativeUrl = this.cdWeb().getFolderByServerRelativeUrl(
          this.getHostServerRelativeUrl() + "/" + data.listName
        );
        (
          file.size <= 10485760
            ? relativeUrl.files.add(fileName, file, (override ? override : false))
            : relativeUrl.files.addChunked(fileName, file, d => { }, (override ? override : false))
        )
          .then((r) => {
            r.file.getItem().then(item => {
              data.data.Id = item["Id"];
              this.save(data).then(r1=>{
                resolve(r1);
              },e=>{
                reject(e);
              });
              // item.update({ data }).then(r1=>{
              //   resolve(r1);
              // });
              // this.cdWeb().lists.getByTitle("Devwals Forms")
              //   .items
              //   .getById(item["ID"]).update(data).then(r1 => {
              //     resolve(item);
              //   }, e1 => {
              //     reject(e1);
              //   });
            });
          },
            (e) => {
              reject(e);
            });
      });
    });
  }
  /***Interface methods ***/
  getLists(basetype?: number) {
    return new Promise((resolve, reject) => {
      this.loadSP().then(r => {
        let filter = basetype != null ? "BaseType eq " + basetype : "";
        this.cdWeb().lists.filter(filter)
          .select("ContentTypes,*")
          .expand("ContentTypes")
          .get()
          .then(r1 => {

            let lists = r1.filter(
              v => v.Hidden == false
                && this.listExclusions.indexOf(v.Title) == -1
            );
            resolve(lists);
          }, (e1) => {
            reject(e1);
          });
      }, (e) => {
        reject(e);
      });
    });
  }

  getListFields(listID: string, includeHidden?: boolean) {
    return new Promise((resolve, reject) => {
      this.loadSP().then(r => {
        this.cdWeb().lists.getById(listID).fields
          .top(1000)
          .get().then(r1 => {

            let fields =
              (includeHidden ? r1 :
                r1.filter(
                  v => v.Hidden == false
                    && this.fieldExclusionsList.indexOf(v.InternalName) == -1
                    && v.InternalName.indexOf("_x003a_") == -1
                    && v.TypeAsString != "Calculated"
                )
              )
                .sort(
                  (a, b) => {
                    if (a.Title < b.Title) {
                      return -1;
                    } else {
                      return 1;
                    }
                  }
                );
            // console.log(fields);
            resolve(fields);

          }, (e1) => {
            reject(e1);
          });
      }, (e) => {
        reject(e);
      });
    });
  }

  save(param: any, filesToUpload?, filesToDelete?) {
    return new Promise((resolve, reject) => {
      this.loadSP().then(r => {
        let id = param.data.Id || param.data.ID;
        const request =
          id > 0
            ? this.cdWeb().lists.getById(param.listId).items.getById(id).update(param.data)
            : this.cdWeb().lists.getById(param.listId).items.add(param.data);
        request.then(r1 => {

          if (filesToDelete) {
            r1.item.attachmentFiles.deleteMultiple(...filesToDelete.map(f => f.name)).then(r2 => {

              if (filesToUpload) {
                r1.item.attachmentFiles.addMultiple(filesToUpload).then(r2 => {
                  resolve(r1);
                }, e => {
                  reject(e);
                });
              } else resolve(r1);

            }, e => {
              reject(e);
            });

          } else if (filesToUpload) {
            r1.item.attachmentFiles.addMultiple(filesToUpload).then(r2 => {
              resolve(r1);
            }, e => {
              reject(e);
            });
          } else {
            resolve(r1);
          }

        }, (e1) => {
          reject(e1);
        });
      }, (e) => {
        reject(e);
      });
    });
  }
  /***End Interface methods ***/
}
