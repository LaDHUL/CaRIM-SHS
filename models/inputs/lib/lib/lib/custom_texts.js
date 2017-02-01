 /*/DEBUG
 writeOut = function () {};
 Meteor.methods({
     writeout: function (txt) {
         //HELPER DEBUG
         check(txt, Object);
         if (Meteor.isServer) {
             writeOut(txt)
         }
     }
 });
 // */

 Textes = new Mongo.Collection('textes');
 if (Meteor.isClient) {
     Local = {};
 }


 getTxt = function (formname, value) {
     if (!formname) return "ERREUR"

     if (formname.includes("_"))
         formname = formname.replace("_", ".");
     var name = formname + "." + value

     var doc = Textes.findOne({
         name: name
     });

     var text = doc ? doc.value : ""

     /* DEBUG
     Meteor.call("writeout", {
         key: name,
         value: text
    });
    //*/

     return text
 }

 getLabel = function (context, type) {
     if (Meteor.isServer)
         return false
     if (context) {
         return getTxt(context.id + "." + type, "label") === "" ? false : getTxt(context.id + "." + type, "label")
     }
     return getTxt(type, "label") === "" ? false : getTxt(type, "label");
 }

 getPlaceholder = function (context, type) {
     if (Meteor.isServer)
         return false
     if (context) {
         return getTxt(context.id + "." + type, "placeholder")
     }
     return getTxt(type, "placeholder")
 }
