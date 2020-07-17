# Build
ng build

# Build Watch
ng build --watch

# Notes
- Original version of Nebular "@nebular/theme": "2.0.0-rc.9"

# Deploy URL should be on of the below 
"deployUrl": "../app/dist/", //For sharepoint deployment
"deployUrl": "https://store.devwals.com/spa/spforms/builder/", //For deployment to CDN or other areas

# Known issues
- MMS multi value field has have a name with no spaces. This is a limitation with REST API at the moment
