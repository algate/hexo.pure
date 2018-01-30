require('../src/css/codemirror.css');
require('../src/css/foldgutter.css');
import {CodeMirror} from '../base/codemirror/codemirror';
import '../base/codemirror/javascript.js';
import '../base/codemirror/css.js';
import '../base/codemirror/htmlmixed.js';
import '../base/codemirror/xml.js';

class OnlineEditor{
	handler(el,way){
        el.each((k,v) =>{
            CodeMirror.fromTextArea(v, {
                lineNumbers: true,
                mode: way,
                matchBrackets: true
            });
        });
    }
}

let cm = new OnlineEditor();
let cm_textarea = $('.cm_textarea');
let _script = $('.cm_textarea_script');
let _css = $('.cm_textarea_css');
let _xml = $('.cm_textarea_xml');

cm_textarea.length > 0 && cm.handler(cm_textarea,'text/html');
_script.length > 0 && cm.handler(_script,'javascript');
_css.length > 0 && cm.handler(_css,'css');
_xml.length > 0 && cm.handler(_xml,'xml');

export default cm;