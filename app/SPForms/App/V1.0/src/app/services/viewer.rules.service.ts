import { Injectable, OnInit } from '@angular/core';
// import Handlebars from 'handlebars/dist/handlebars.min.js';

@Injectable({
    providedIn: 'root'
})
export class ViewerRulesService implements OnInit {

    conditionalLogicOutputs: any = {};

    constructor() { }

    ngOnInit() { }

    executeFormRules(model: any, fields: any[], rules: any[]) {
        console.log("Eval rule");
        for (let index = 0; index < rules.length; index++) {
            let ruleOutput = false;
            const ruleValue = rules[index];
            for (let index1 = 0; index1 < ruleValue.rules.length; index1++) {
                const rule = ruleValue.rules[index1];
                ruleOutput =
                    index1 == 0 ? this.evalRule(rule, model)
                        : ruleOutput && this.evalRule(rule, model)
            }

            if (ruleOutput) {
                this.evalAction(ruleValue.then);
            } else {
                this.evalAction(ruleValue.else);
            }
        }
    }

    private evalRule(rule: any, model: any) {
        // return model[rule.entity][rule.field] == rule.value;
        return model[rule.field] == rule.value;
    }

    private evalAction(rule) {
        const field = rule.field;
        const action = rule.action;
        this.conditionalLogicOutputs[field] = this.conditionalLogicOutputs[field] || {};
        switch (action) {
            case "Show":
                this.conditionalLogicOutputs[field].hidden = false;
                console.log(field);
                console.log(this.conditionalLogicOutputs[field]);
                break;
            case "Hide":
                this.conditionalLogicOutputs[field].hidden = true;
                break;
            case "Enable":
                this.conditionalLogicOutputs[field].disabled = false;
                break;
            case "Disable":
                this.conditionalLogicOutputs[field].disabled = true;
                break;
            default:
                break;
        }
    }

}
