import Handlebars from "handlebars";

export function registerHelpers(){
    Handlebars.registerHelper('choose', function (a, b) {return a ? a : b;})
}
