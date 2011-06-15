// (c) 2010 CodePlex Foundation
(function(){var b="HtmlEditorExtenderBehavior";function a(){var g="ToolbarButtons",b=false,e="blur",a=null,d=true,f="unselectable",c="div";Type.registerNamespace("Sys.Extended.UI");Sys.Extended.UI.HtmlEditorExtenderBehavior=function(g){var b=this;Sys.Extended.UI.HtmlEditorExtenderBehavior.initializeBase(b,[g]);b._textbox=Sys.Extended.UI.TextBoxWrapper.get_Wrapper(g);var e=b.get_id();b._ButtonWidth=23;b._ButtonHeight=21;b._containerTemplate={nodeName:c,properties:{id:e+"_ExtenderContainer"},cssClasses:[f,"ajax__html_editor_extender_container"]};b._editableTemplate={nodeName:c,properties:{id:e+"_ExtenderContentEditable",style:{width:"100%",height:"100%",overflow:"auto",clear:"both"},contentEditable:d},cssClasses:["ajax__html_editor_extender_texteditor"]};b._buttonTemplate={nodeName:"input",properties:{type:"button",style:{width:b._ButtonWidth+"px",height:b._ButtonHeight+"px"}},cssClasses:["ajax__html_editor_extender_button"]};b._topButtonContainerTemplate={nodeName:c,properties:{id:e+"_ExtenderButtonContainer"},cssClasses:["ajax__html_editor_extender_buttoncontainer"]};b._container=a;b._toolbarButtons=a;b._editableDiv=a;b._topButtonContainer=a;b._buttons=[];b._btnClickHandler=a;b._requested_buttons=[];if(typeof WebForm_OnSubmit=="function"&&!Sys.Extended.UI.HtmlEditorExtenderBehavior._originalWebForm_OnSubmit){Sys.Extended.UI.HtmlEditorExtenderBehavior._originalWebForm_OnSubmit=WebForm_OnSubmit;WebForm_OnSubmit=Sys.Extended.UI.HtmlEditorExtenderBehavior.WebForm_OnSubmit}};Sys.Extended.UI.HtmlEditorExtenderBehavior.prototype={initialize:function(){var b=this;Sys.Extended.UI.HtmlEditorExtenderBehavior.callBaseMethod(b,"initialize");var i=0;b._button_list=[];b._createContainer();b._createTopButtonContainer();b._createEditableDiv();b._createButton();var c=b._textbox._element.parentNode;while(c!=a&&c.nodeName!="FORM")c=c.parentNode;if(c==a)throw"Missing Form tag";var g=Function.createDelegate(b,b._textBox_onblur),f=Function.createDelegate(b,b._editableDiv_onblur),h=Function.createDelegate(b,b._executeCommand);$addHandler(b._textbox._element,e,g,d);$addHandler(b._editableDiv,e,f,d);$addHandler(b._topButtonContainer,"click",h)},_dispose:function(){$removeHandler(this._textbox._element,e,delTextBox_onblur);$removeHandler(this._editableDiv,e,delEditableDiv_onblur);$removeHandler(_topButtonContainer,"click",btnClickHandler);Sys.Extended.UI.HtmlEditorExtenderBehavior.callBaseMethod(this,"dispose")},_createContainer:function(){var a=this,c=a.get_element();a._container=$common.createElementFromTemplate(a._containerTemplate,c.parentNode);var b=$common.getBounds(a._textbox._element);$common.setSize(a._container,{width:b.width,height:b.height});$common.wrapElement(a._textbox._element,a._container,a._container)},_createTopButtonContainer:function(){this._topButtonContainer=$common.createElementFromTemplate(this._topButtonContainerTemplate,this._container)},_createButton:function(){var a=this;for(i=0;i<a._toolbarButtons.length;i++){var b=$common.createElementFromTemplate(a._buttonTemplate,a._topButtonContainer);b.setAttribute("id",a._id+a._toolbarButtons[i].CommandName);b.setAttribute("name",a._toolbarButtons[i].CommandName);b.setAttribute("title",a._toolbarButtons[i].Tooltip);b.setAttribute(f,"on");b.setAttribute("class","ajax__html_editor_extender_button ajax__html_editor_extender_"+a._toolbarButtons[i].CommandName);Array.add(a._buttons,b)}},_createEditableDiv:function(){var a=this;a._editableDiv=$common.createElementFromTemplate(a._editableTemplate,a._container);a._editableDiv.innerHTML=a._textbox._element.value;$common.setVisible(a._textbox._element,b)},_editableDiv_onblur:function(){this._textbox._element.value=this.innerHTML},_textBox_onblur:function(){this._editableDiv.innerHTML=this.value},_editableDiv_submit:function(){var c=this,e=3,b=a;c._editableDiv.focus();if(Sys.Browser.agent!=Sys.Browser.Firefox)if(document.selection){b=document.selection.createRange();b.moveStart("character",e);b.select()}else{b=window.getSelection();b.collapse(c._editableDiv.firstChild,e)}var d=c._editableDiv.innerHTML.replace(/&/ig,"&amp;").replace(/</ig,"&lt;").replace(/>/ig,"&gt;").replace(/\"/ig,"&quot;").replace(/\xA0/ig,"&nbsp;");d=d.replace(/&lt;STRONG&gt;/ig,"&lt;b&gt;").replace(/&lt;\/STRONG&gt;/ig,"&lt;/b&gt;").replace(/&lt;EM&gt;/ig,"&lt;i&gt;").replace(/&lt;\/EM&gt;/ig,"&lt;/i&gt;");c._textbox._element.value=d},_executeCommand:function(e){var j=Sys.Browser.agent==Sys.Browser.Firefox;j&&document.execCommand("styleWithCSS",b,b);if(e.target.name=="JustifyRight"||e.target.name=="JustifyLeft"||e.target.name=="JustifyCenter"||e.target.name=="JustifyFull")try{document.execCommand(e.target.name,b,a)}catch(k){if(k&&k.result==2147500037){var i=window.getSelection().getRangeAt(0),g=document.createElement(c),h=b;g.style.height="1px;";if(i.startContainer.contentEditable=="true"){window.getSelection().collapseToEnd();h=d}var f=window.getSelection().getRangeAt(0).startContainer;while(f&&f.contentEditable!="true")f=f.parentNode;if(!f)throw"Selected node is not editable!";f.insertBefore(g,f.childNodes[0]);document.execCommand(e.target.name,b,a);g.parentNode.removeChild(g);h&&window.getSelection().addRange(i)}else console&&console.log&&console.log(k)}else document.execCommand(e.target.name,b,a)},get_ButtonWidth:function(){return this._ButtonWidth},set_ButtonWidth:function(a){if(this._ButtonWidth!=a){this._ButtonWidth=a;this.raisePropertyChanged("ButtonWidth")}},get_ButtonHeight:function(){return this._ButtonHeight},set_ButtonHeight:function(a){if(this._ButtonHeight!=a){this._ButtonHeight=a;this.raisePropertyChanged("ButtonHeight")}},get_ToolbarButtons:function(){return this._toolbarButtons},set_ToolbarButtons:function(a){if(this._toolbarButtons!=a){this._toolbarButtons=a;this.raisePropertyChanged(g)}}};Sys.Extended.UI.HtmlEditorExtenderBehavior.registerClass("Sys.Extended.UI.HtmlEditorExtenderBehavior",Sys.Extended.UI.BehaviorBase);Sys.registerComponent(Sys.Extended.UI.HtmlEditorExtenderBehavior,{name:"HtmlEditorExtender",parameters:[{name:g,type:"HtmlEditorExtenderButton[]"}]});Sys.Extended.UI.HtmlEditorExtenderBehavior.WebForm_OnSubmit=function(){var d=Sys.Extended.UI.HtmlEditorExtenderBehavior._originalWebForm_OnSubmit();if(d)for(var b=Sys.Application.getComponents(),a=0;a<b.length;a++){var c=b[a];Sys.Extended.UI.HtmlEditorExtenderBehavior.isInstanceOfType(c)&&c._editableDiv_submit()}return d}}if(window.Sys&&Sys.loader)Sys.loader.registerScript(b,["ExtendedBase","ExtendedCommon"],a);else a()})();