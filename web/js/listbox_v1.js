/* global con, HTMLElement, evt */
"use strict";


document.registerElement("my-listbox", {
    prototype: {
        __proto__: HTMLElement.prototype,
        createdCallback: function (p) {
//            console.log(p);
//            console.log('createdCallback');
        },
        detachedCallback: function () {
//            console.log('detachedCallback');
        },
        attributeChangedCallback: function (name, prevValue, newValue) {
            console.log("name:%s  prevValue:%s   newValue:%s", name, prevValue, newValue);
        },
        attachedCallback: function () {
            this.obj = document.getElementById(this.id);

            this.evt = new CustomEvent('xxxxx5', {
                detail: {v: ""}
            }, {bubbles: true, cancelable: true});


            var ob = $(this.obj);
            ob.attr({class: 'listbox'});
            this.callback = this.getAttribute('data-handler_callback');
            var callback = this.callback;
            this.placeholder = this.getAttribute('data-placeholder') || '';
            this.set = JSON.parse(this.getAttribute('set') || '');
            var n_row = this.set.n_row || 11;
            var header = this.callback + '_' + this.obj.id + '_expl';
            this.shadow_root = document.getElementById(this.id).createShadowRoot();
            this.shadow_root.innerHTML = '<style> @import "CSS/listbox.css" </style>\n\
<input id="in" class="inp" type="text" value="" data-fn="0" data-id="0" data-old=""  placeholder="' + this.placeholder + '">\n\
<div id="div_list" class="div_list"></div>';

            var obInput = $(this.shadow_root.getElementById('in'));
            var divlist = $(this.shadow_root.getElementById('div_list'));
            divlist.css('width', ob.outerWidth());
            divlist.css('max-height', n_row * 21);
            obInput.one('focus', {obj: this}, function (ev) {
                var inp = $(this);
                $(this).bind('keydown', function (event) {
                    var key;
                    if (window.event) {
                        key = window.event.keyCode;
                    } else {
                        key = event.keyCode;
                    }
                    switch (key + event.ctrlKey * 10000) {
                        case 27:
                            inp.attr({
                                'data-in': '0',
                                'data-id': '',
                                'data-old': '',
                                'data-fn': '0'
                            });
                            inp.val('');
                            divlist.css('display', 'none');
                            divlist.empty();
                            break;
                        case 13:

                        case 9:
                            divlist.find("table").find("td").unbind("click").unbind("hover");
                            divlist.unbind('hover');
                            var td = divlist.find('table tr:eq(' + (parseInt(inp.attr('data-fn')) - 1) + ') td:eq(0)');
                            inp.attr({
                                'data-id': td.attr('data-id'),
                                'data-old': td.html()
                            });
                            divlist.empty().css('display', 'none');
                            ev.data.obj.ready(inp.attr('data-id'), ev.data.obj.evt, callback);
                            break;
                        case 38://up
                            var n = parseInt(inp.attr("data-fn"));
                            if (n > 1) {
                                divlist.find("table").find("td").css("background", "none");
                                n--;
                                var d = divlist.find("table").find("[data-fn=" + n + "]");
                                d.css("background", "#ff0000");
                                inp.val(d.html());
                                inp.attr("data-fn", n);
                                if (n > (n_row - 1))
                                    divlist.scrollTop((n - n_row) * 21);
                            }
                            return true;
                            break;
                        case 40://down
                            var n = parseInt(inp.attr("data-fn"));
                            var m = parseInt(divlist.find("table").find("td").filter(":last").attr("data-fn"));
                            if (n < m) {
                                divlist.find("table").find("td").css("background", "none");
                                n++;
                                var d = divlist.find("table").find("[data-fn=" + n + "]");
                                d.css("background", "#ff0000");
                                inp.val(d.html());
                                inp.attr("data-fn", n);
                                if (n > (n_row - 1))
                                    divlist.scrollTop((n - n_row) * 21);
                            }
                            return true;
                            break;
                        case 10090: //ctrl + z
                            inp.val('');
                            inp.val(inp.attr('data-old'));
                            return true;
                            break;
                    }
                });
                obInput.on('input', {header: header}, function (event) {
//                    con.send(event.data.header + $(this).val());

                    $.ajax({
                        type: "POST",
                        url: "Listboxx",
                        data: "name=" + event.data.header + "&value=" + $(this).val(),
//                        dataType: "text",
                        success: function (msg) {
                            var rg = /^([a-z_0-9.]{1,})\|([\s\S]*)/;
                            var r = rg.exec(msg);
                            try {
                                if (r[1].includes('.')) {
                                    var d = r[1].split('.');
                                    window[d[0]][d[1]](r[2]);
                                } else {
                                    window[r[1]](r[2]);
                                }
                            } catch (er) {
                                console.log('ошибка ' + er.stack);
                                console.log('вызов ' + r[1]);
                                console.trace();
                            }
                        }
                    });
                });
                obInput.on('blur', function () {
                    $(document).unbind('keydown');
                });

            });
        },
        ready: function (id, evt, callback) {
            evt.detail.v = id;
            var t = document.getElementsByClassName('ff');
            [].forEach.call(t, function (r) {
                r.dispatchEvent(evt);
            });
            window[callback](id);
        },
        expl: function (p) {
            var callback = this.callback;
            var inp = $(this.shadow_root.getElementById('in'));
            var divlist = $(this.shadow_root.getElementById('div_list'));
            inp.attr("data-fn", 0);
            divlist.empty().append(p).css('display', 'block');

            $(divlist).find('td').on('click', {obj: this.obj}, function (ev) {
                inp.attr("data-fn", $(this).attr("data-fn"));
                inp.attr("data-old", $(this).find("td").html());
                inp.attr("data-id", $(this).attr("data-id"));
                divlist.find("table").find("tr").unbind("click");
                divlist.unbind('hover');
                divlist.empty();
                divlist.css('display', 'none');
                inp.focus();
                ev.data.obj.ready(inp.attr('data-id'), ev.data.obj.evt, callback);
            });
            $(this.shadow_root.getElementById('xxx')).find('td').attr('onmouseover', this.obj.id + '.td_mouseover(this);');

        },
        td_mouseover: function (p) {
            var inp = $(this.shadow_root.getElementById('in'));
            inp.val($(p).html());
            inp.attr("data-fn", $(p).attr("data-fn"));
        }
    }
});

// listbox
