! function(n) {
    "function" == typeof define && define.amd ? define(["jquery"], function(t) {
        return n(t, window, document)
    }) : "object" == typeof exports ? module.exports = function(t, e) {
        return t || (t = window), e || (e = "undefined" != typeof window ? require("jquery") : require("jquery")(t)), n(e, t, t.document)
    } : n(jQuery, window, document)
}(function(L, g, y, R) {
    function r(e) {
        var n, a, o = {};
        L.each(e, function(t) {
            (n = t.match(/^([^A-Z]+?)([A-Z])/)) && -1 !== "a aa ai ao as b fn i m o s ".indexOf(n[1] + " ") && (a = t.replace(n[0], n[2].toLowerCase()), o[a] = t, "o" === n[1] && r(e[t]))
        }), e._hungarianMap = o
    }

    function x(e, n, a) {
        var o;
        e._hungarianMap || r(e), L.each(n, function(t) {
            (o = e._hungarianMap[t]) === R || !a && n[o] !== R || ("o" === o.charAt(0) ? (n[o] || (n[o] = {}), L.extend(!0, n[o], n[t]), x(e[o], n[o], a)) : n[o] = n[t])
        })
    }

    function S(t) {
        var e = $t.defaults.oLanguage,
            n = t.sZeroRecords;
        !t.sEmptyTable && n && "No data available in table" === e.sEmptyTable && Lt(t, t, "sZeroRecords", "sEmptyTable"), !t.sLoadingRecords && n && "Loading..." === e.sLoadingRecords && Lt(t, t, "sZeroRecords", "sLoadingRecords"), t.sInfoThousands && (t.sThousands = t.sInfoThousands), (t = t.sDecimal) && Wt(t)
    }


    // ESTA FUNCION APAGA LOS BUSCADORES EN LOS MODALES DE AGREGAR ENFERMEDADES
    function I(t) {
        if (ue(t, "ordering", "bSort"), ue(t, "orderMulti", "bSortMulti"), ue(t, "orderClasses", "bSortClasses"), ue(t, "orderCellsTop", "bSortCellsTop"), ue(t, "order", "aaSorting"), ue(t, "orderFixed", "aaSortingFixed"), ue(t, "paging", "bPaginate"), ue(t, "pagingType", "sPaginationType"), ue(t, "pageLength", "iDisplayLength"), ue(t, "searching", "bFilter"), "boolean" == typeof t.sScrollX && (t.sScrollX = t.sScrollX ? "100%" : ""), "boolean" == typeof t.scrollX && (t.scrollX = t.scrollX ? "100%" : ""), t = t.aoSearchCols)
            for (var e = 0, n = t.length; e < n; e++) t[e] && x($t.models.oSearch, t[e])
    }

    function D(t) {
        ue(t, "orderable", "bSortable"), ue(t, "orderData", "aDataSort"), ue(t, "orderSequence", "asSorting"), ue(t, "orderDataType", "sortDataType");
        var e = t.aDataSort;
        "number" == typeof e && !L.isArray(e) && (t.aDataSort = [e])
    }

    function w(t) {
        if (!$t.__browser) {
            var e = {};
            $t.__browser = e;
            var n = L("<div/>").css({
                    position: "fixed",
                    top: 0,
                    left: -1 * L(g).scrollLeft(),
                    height: 1,
                    width: 1,
                    overflow: "hidden"
                }).append(L("<div/>").css({
                    position: "absolute",
                    top: 1,
                    left: 1,
                    width: 100,
                    overflow: "scroll"
                }).append(L("<div/>").css({
                    width: "100%",
                    height: 10
                }))).appendTo("body"),
                a = n.children(),
                o = a.children();
            e.barWidth = a[0].offsetWidth - a[0].clientWidth, e.bScrollOversize = 100 === o[0].offsetWidth && 100 !== a[0].clientWidth, e.bScrollbarLeft = 1 !== Math.round(o.offset().left), e.bBounding = !!n[0].getBoundingClientRect().width, n.remove()
        }
        L.extend(t.oBrowser, $t.__browser), t.oScroll.iBarWidth = $t.__browser.barWidth
    }

    function n(t, e, n, a, o, r) {
        var l, i = !1;
        for (n !== R && (l = n, i = !0); a !== o;) t.hasOwnProperty(a) && (l = i ? e(l, t[a], a, t) : t[a], i = !0, a += r);
        return l
    }

    function _(t, e) {
        var n = $t.defaults.column,
            a = t.aoColumns.length;
        n = L.extend({}, $t.models.oColumn, n, {
            nTh: e || y.createElement("th"),
            sTitle: n.sTitle ? n.sTitle : e ? e.innerHTML : "",
            aDataSort: n.aDataSort ? n.aDataSort : [a],
            mData: n.mData ? n.mData : a,
            idx: a
        });
        t.aoColumns.push(n), (n = t.aoPreSearchCols)[a] = L.extend({}, $t.models.oSearch, n[a]), T(t, a, L(e).data())
    }

    function T(t, e, n) {
        e = t.aoColumns[e];
        var a = t.oClasses,
            o = L(e.nTh);
        if (!e.sWidthOrig) {
            e.sWidthOrig = o.attr("width") || null;
            var r = (o.attr("style") || "").match(/width:\s*(\d+[pxem%]+)/);
            r && (e.sWidthOrig = r[1])
        }
        n !== R && null !== n && (D(n), x($t.defaults.column, n), n.mDataProp !== R && !n.mData && (n.mData = n.mDataProp), n.sType && (e._sManualType = n.sType), n.className && !n.sClass && (n.sClass = n.className), n.sClass && o.addClass(n.sClass), L.extend(e, n), Lt(e, n, "sWidth", "sWidthOrig"), n.iDataSort !== R && (e.aDataSort = [n.iDataSort]), Lt(e, n, "aDataSort"));
        var l = e.mData,
            i = j(l),
            s = e.mRender ? j(e.mRender) : null;
        n = function(t) {
            return "string" == typeof t && -1 !== t.indexOf("@")
        };
        e._bAttrSrc = L.isPlainObject(l) && (n(l.sort) || n(l.type) || n(l.filter)), e._setter = null, e.fnGetData = function(t, e, n) {
            var a = i(t, e, R, n);
            return s && e ? s(a, e, t, n) : a
        }, e.fnSetData = function(t, e, n) {
            return h(l)(t, e, n)
        }, "number" != typeof l && (t._rowReadObject = !0), t.oFeatures.bSort || (e.bSortable = !1, o.addClass(a.sSortableNone)), t = -1 !== L.inArray("asc", e.asSorting), n = -1 !== L.inArray("desc", e.asSorting), e.bSortable && (t || n) ? t && !n ? (e.sSortingClass = a.sSortableAsc, e.sSortingClassJUI = a.sSortJUIAscAllowed) : !t && n ? (e.sSortingClass = a.sSortableDesc, e.sSortingClassJUI = a.sSortJUIDescAllowed) : (e.sSortingClass = a.sSortable, e.sSortingClassJUI = a.sSortJUI) : (e.sSortingClass = a.sSortableNone, e.sSortingClassJUI = "")
    }

    function P(t) {
        if (!1 !== t.oFeatures.bAutoWidth) {
            var e = t.aoColumns;
            bt(t);
            for (var n = 0, a = e.length; n < a; n++) e[n].nTh.style.width = e[n].sWidth
        }("" !== (e = t.oScroll).sY || "" !== e.sX) && ht(t), jt(t, null, "column-sizing", [t])
    }

    function N(t, e) {
        var n = C(t, "bVisible");
        return "number" == typeof n[e] ? n[e] : null
    }

    function u(t, e) {
        var n = C(t, "bVisible");
        return -1 !== (n = L.inArray(e, n)) ? n : null
    }

    function v(t) {
        var n = 0;
        return L.each(t.aoColumns, function(t, e) {
            e.bVisible && "none" !== L(e.nTh).css("display") && n++
        }), n
    }

    function C(t, n) {
        var a = [];
        return L.map(t.aoColumns, function(t, e) {
            t[n] && a.push(e)
        }), a
    }

    function l(t) {
        var e, n, a, o, r, l, i, s, u, c = t.aoColumns,
            d = t.aoData,
            f = $t.ext.type.detect;
        for (e = 0, n = c.length; e < n; e++)
            if (u = [], !(i = c[e]).sType && i._sManualType) i.sType = i._sManualType;
            else if (!i.sType) {
            for (a = 0, o = f.length; a < o; a++) {
                for (r = 0, l = d.length; r < l && (u[r] === R && (u[r] = B(t, r, e, "type")), (s = f[a](u[r], t)) || a === f.length - 1) && "html" !== s; r++);
                if (s) {
                    i.sType = s;
                    break
                }
            }
            i.sType || (i.sType = "string")
        }
    }

    function F(t, e, n, a) {
        var o, r, l, i, s, u, c = t.aoColumns;
        if (e)
            for (o = e.length - 1; 0 <= o; o--) {
                var d = (u = e[o]).targets !== R ? u.targets : u.aTargets;
                for (L.isArray(d) || (d = [d]), r = 0, l = d.length; r < l; r++)
                    if ("number" == typeof d[r] && 0 <= d[r]) {
                        for (; c.length <= d[r];) _(t);
                        a(d[r], u)
                    } else if ("number" == typeof d[r] && d[r] < 0) a(c.length + d[r], u);
                else if ("string" == typeof d[r])
                    for (i = 0, s = c.length; i < s; i++)("_all" == d[r] || L(c[i].nTh).hasClass(d[r])) && a(i, u)
            }
        if (n)
            for (o = 0, t = n.length; o < t; o++) a(o, n[o])
    }

    function A(t, e, n, a) {
        var o = t.aoData.length,
            r = L.extend(!0, {}, $t.models.oRow, {
                src: n ? "dom" : "data",
                idx: o
            });
        r._aData = e, t.aoData.push(r);
        for (var l = t.aoColumns, i = 0, s = l.length; i < s; i++) l[i].sType = null;
        return t.aiDisplayMaster.push(o), (e = t.rowIdFn(e)) !== R && (t.aIds[e] = r), (n || !t.oFeatures.bDeferRender) && m(t, o, n, a), o
    }

    function k(n, t) {
        var a;
        return t instanceof L || (t = L(t)), t.map(function(t, e) {
            return a = s(n, e), A(n, a.data, e, a.cells)
        })
    }

    function B(t, e, n, a) {
        var o = t.iDraw,
            r = t.aoColumns[n],
            l = t.aoData[e]._aData,
            i = r.sDefaultContent,
            s = r.fnGetData(l, a, {
                settings: t,
                row: e,
                col: n
            });
        if (s === R) return t.iDrawError != o && null === i && (Bt(t, 0, "Requested unknown parameter " + ("function" == typeof r.mData ? "{function}" : "'" + r.mData + "'") + " for row " + e + ", column " + n, 4), t.iDrawError = o), i;
        if (s !== l && null !== s || null === i || a === R) {
            if ("function" == typeof s) return s.call(l)
        } else s = i;
        return null === s && "display" == a ? "" : s
    }

    function a(t, e, n, a) {
        t.aoColumns[n].fnSetData(t.aoData[e]._aData, a, {
            settings: t,
            row: e,
            col: n
        })
    }

    function c(t) {
        return L.map(t.match(/(\\.|[^\.])+/g) || [""], function(t) {
            return t.replace(/\\\./g, ".")
        })
    }

    function j(o) {
        if (L.isPlainObject(o)) {
            var r = {};
            return L.each(o, function(t, e) {
                    e && (r[t] = j(e))
                }),
                function(t, e, n, a) {
                    var o = r[e] || r._;
                    return o !== R ? o(t, e, n, a) : t
                }
        }
        if (null === o) return function(t) {
            return t
        };
        if ("function" == typeof o) return function(t, e, n, a) {
            return o(t, e, n, a)
        };
        if ("string" != typeof o || -1 === o.indexOf(".") && -1 === o.indexOf("[") && -1 === o.indexOf("(")) return function(t) {
            return t[o]
        };
        var i = function(t, e, n) {
            var a, o;
            if ("" !== n)
                for (var r = 0, l = (o = c(n)).length; r < l; r++) {
                    if (n = o[r].match(ce), a = o[r].match(de), n) {
                        if (o[r] = o[r].replace(ce, ""), "" !== o[r] && (t = t[o[r]]), a = [], o.splice(0, r + 1), o = o.join("."), L.isArray(t))
                            for (r = 0, l = t.length; r < l; r++) a.push(i(t[r], e, o));
                        t = "" === (t = n[0].substring(1, n[0].length - 1)) ? a : a.join(t);
                        break
                    }
                    if (a) o[r] = o[r].replace(de, ""), t = t[o[r]]();
                    else {
                        if (null === t || t[o[r]] === R) return R;
                        t = t[o[r]]
                    }
                }
            return t
        };
        return function(t, e) {
            return i(t, e, o)
        }
    }

    function h(a) {
        if (L.isPlainObject(a)) return h(a._);
        if (null === a) return function() {};
        if ("function" == typeof a) return function(t, e, n) {
            a(t, "set", e, n)
        };
        if ("string" != typeof a || -1 === a.indexOf(".") && -1 === a.indexOf("[") && -1 === a.indexOf("(")) return function(t, e) {
            t[a] = e
        };
        var s = function(t, e, n) {
            var a;
            a = (n = c(n))[n.length - 1];
            for (var o, r, l = 0, i = n.length - 1; l < i; l++) {
                if (o = n[l].match(ce), r = n[l].match(de), o) {
                    if (n[l] = n[l].replace(ce, ""), t[n[l]] = [], (a = n.slice()).splice(0, l + 1), o = a.join("."), L.isArray(e))
                        for (r = 0, i = e.length; r < i; r++) s(a = {}, e[r], o), t[n[l]].push(a);
                    else t[n[l]] = e;
                    return
                }
                r && (n[l] = n[l].replace(de, ""), t = t[n[l]](e)), null !== t[n[l]] && t[n[l]] !== R || (t[n[l]] = {}), t = t[n[l]]
            }
            a.match(de) ? t[a.replace(de, "")](e) : t[a.replace(ce, "")] = e
        };
        return function(t, e) {
            return s(t, e, a)
        }
    }

    function p(t) {
        return oe(t.aoData, "_aData")
    }

    function i(t) {
        t.aoData.length = 0, t.aiDisplayMaster.length = 0, t.aiDisplay.length = 0, t.aIds = {}
    }

    function d(t, e, n) {
        for (var a = -1, o = 0, r = t.length; o < r; o++) t[o] == e ? a = o : t[o] > e && t[o]--; - 1 != a && n === R && t.splice(a, 1)
    }

    function o(n, a, t, e) {
        var o, r = n.aoData[a],
            l = function(t, e) {
                for (; t.childNodes.length;) t.removeChild(t.firstChild);
                t.innerHTML = B(n, a, e, "display")
            };
        if ("dom" !== t && (t && "auto" !== t || "dom" !== r.src)) {
            var i = r.anCells;
            if (i)
                if (e !== R) l(i[e], e);
                else
                    for (t = 0, o = i.length; t < o; t++) l(i[t], t)
        } else r._aData = s(n, r, e, e === R ? R : r._aData).data;
        if (r._aSortData = null, r._aFilterData = null, l = n.aoColumns, e !== R) l[e].sType = null;
        else {
            for (t = 0, o = l.length; t < o; t++) l[t].sType = null;
            f(n, r)
        }
    }

    function s(t, e, n, a) {
        var o, r, l, i = [],
            s = e.firstChild,
            u = 0,
            c = t.aoColumns,
            d = t._rowReadObject,
            f = (a = a !== R ? a : d ? {} : [], function(t, e) {
                if ("string" == typeof t) {
                    var n = t.indexOf("@"); - 1 !== n && (n = t.substring(n + 1), h(t)(a, e.getAttribute(n)))
                }
            }),
            p = function(t) {
                n !== R && n !== u || (r = c[u], l = L.trim(t.innerHTML), r && r._bAttrSrc ? (h(r.mData._)(a, l), f(r.mData.sort, t), f(r.mData.type, t), f(r.mData.filter, t)) : d ? (r._setter || (r._setter = h(r.mData)), r._setter(a, l)) : a[u] = l), u++
            };
        if (s)
            for (; s;) "TD" != (o = s.nodeName.toUpperCase()) && "TH" != o || (p(s), i.push(s)), s = s.nextSibling;
        else
            for (s = 0, o = (i = e.anCells).length; s < o; s++) p(i[s]);
        return (e = e.firstChild ? e : e.nTr) && (e = e.getAttribute("id")) && h(t.rowId)(a, e), {
            data: a,
            cells: i
        }
    }

    function m(t, e, n, a) {
        var o, r, l, i, s, u = t.aoData[e],
            c = u._aData,
            d = [];
        if (null === u.nTr) {
            for (o = n || y.createElement("tr"), u.nTr = o, u.anCells = d, o._DT_RowIndex = e, f(t, u), i = 0, s = t.aoColumns.length; i < s; i++) l = t.aoColumns[i], (r = n ? a[i] : y.createElement(l.sCellType))._DT_CellIndex = {
                row: e,
                column: i
            }, d.push(r), n && !l.mRender && l.mData === i || L.isPlainObject(l.mData) && l.mData._ === i + ".display" || (r.innerHTML = B(t, e, i, "display")), l.sClass && (r.className += " " + l.sClass), l.bVisible && !n ? o.appendChild(r) : !l.bVisible && n && r.parentNode.removeChild(r), l.fnCreatedCell && l.fnCreatedCell.call(t.oInstance, r, B(t, e, i), c, e, i);
            jt(t, "aoRowCreatedCallback", null, [o, c, e])
        }
        u.nTr.setAttribute("role", "row")
    }

    function f(t, e) {
        var n = e.nTr,
            a = e._aData;
        if (n) {
            var o = t.rowIdFn(a);
            o && (n.id = o), a.DT_RowClass && (o = a.DT_RowClass.split(" "), e.__rowc = e.__rowc ? se(e.__rowc.concat(o)) : o, L(n).removeClass(e.__rowc.join(" ")).addClass(a.DT_RowClass)), a.DT_RowAttr && L(n).attr(a.DT_RowAttr), a.DT_RowData && L(n).data(a.DT_RowData)
        }
    }

    function b(t) {
        var e, n, a, o, r, l = t.nTHead,
            i = t.nTFoot,
            s = 0 === L("th, td", l).length,
            u = t.oClasses,
            c = t.aoColumns;
        for (s && (o = L("<tr/>").appendTo(l)), e = 0, n = c.length; e < n; e++) r = c[e], a = L(r.nTh).addClass(r.sClass), s && a.appendTo(o), t.oFeatures.bSort && (a.addClass(r.sSortingClass), !1 !== r.bSortable && (a.attr("tabindex", t.iTabIndex).attr("aria-controls", t.sTableId), _t(t, r.nTh, e))), r.sTitle != a[0].innerHTML && a.html(r.sTitle), Ht(t, "header")(t, a, r, u);
        if (s && W(t.aoHeader, l), L(l).find(">tr").attr("role", "row"), L(l).find(">tr>th, >tr>td").addClass(u.sHeaderTH), L(i).find(">tr>th, >tr>td").addClass(u.sFooterTH), null !== i)
            for (e = 0, n = (t = t.aoFooter[0]).length; e < n; e++)(r = c[e]).nTf = t[e].cell, r.sClass && L(r.nTf).addClass(r.sClass)
    }

    function O(t, e, n) {
        var a, o, r, l, i = [],
            s = [],
            u = t.aoColumns.length;
        if (e) {
            for (n === R && (n = !1), a = 0, o = e.length; a < o; a++) {
                for (i[a] = e[a].slice(), i[a].nTr = e[a].nTr, r = u - 1; 0 <= r; r--) !t.aoColumns[r].bVisible && !n && i[a].splice(r, 1);
                s.push([])
            }
            for (a = 0, o = i.length; a < o; a++) {
                if (t = i[a].nTr)
                    for (; r = t.firstChild;) t.removeChild(r);
                for (r = 0, e = i[a].length; r < e; r++)
                    if (l = u = 1, s[a][r] === R) {
                        for (t.appendChild(i[a][r].cell), s[a][r] = 1; i[a + u] !== R && i[a][r].cell == i[a + u][r].cell;) s[a + u][r] = 1, u++;
                        for (; i[a][r + l] !== R && i[a][r].cell == i[a][r + l].cell;) {
                            for (n = 0; n < u; n++) s[a + n][r + l] = 1;
                            l++
                        }
                        L(i[a][r].cell).attr("rowspan", u).attr("colspan", l)
                    }
            }
        }
    }

    function H(t) {
        var e = jt(t, "aoPreDrawCallback", "preDraw", [t]);
        if (-1 !== L.inArray(!1, e)) ft(t, !1);
        else {
            e = [];
            var n = 0,
                a = t.asStripeClasses,
                o = a.length,
                r = t.oLanguage,
                l = t.iInitDisplayStart,
                i = "ssp" == Et(t),
                s = t.aiDisplay;
            t.bDrawing = !0, l !== R && -1 !== l && (t._iDisplayStart = i ? l : l >= t.fnRecordsDisplay() ? 0 : l, t.iInitDisplayStart = -1);
            l = t._iDisplayStart;
            var u = t.fnDisplayEnd();
            if (t.bDeferLoading) t.bDeferLoading = !1, t.iDraw++, ft(t, !1);
            else if (i) {
                if (!t.bDestroying && !z(t)) return
            } else t.iDraw++;
            if (0 !== s.length)
                for (r = i ? t.aoData.length : u, i = i ? 0 : l; i < r; i++) {
                    var c = s[i],
                        d = t.aoData[c];
                    if (null === d.nTr && m(t, c), c = d.nTr, 0 !== o) {
                        var f = a[n % o];
                        d._sRowStripe != f && (L(c).removeClass(d._sRowStripe).addClass(f), d._sRowStripe = f)
                    }
                    jt(t, "aoRowCallback", null, [c, d._aData, n, i]), e.push(c), n++
                } else n = r.sZeroRecords, 1 == t.iDraw && "ajax" == Et(t) ? n = r.sLoadingRecords : r.sEmptyTable && 0 === t.fnRecordsTotal() && (n = r.sEmptyTable), e[0] = L("<tr/>", {
                    class: o ? a[0] : ""
                }).append(L("<td />", {
                    valign: "top",
                    colSpan: v(t),
                    class: t.oClasses.sRowEmpty
                }).html(n))[0];
            jt(t, "aoHeaderCallback", "header", [L(t.nTHead).children("tr")[0], p(t), l, u, s]), jt(t, "aoFooterCallback", "footer", [L(t.nTFoot).children("tr")[0], p(t), l, u, s]), (a = L(t.nTBody)).children().detach(), a.append(L(e)), jt(t, "aoDrawCallback", "draw", [t]), t.bSorted = !1, t.bFiltered = !1, t.bDrawing = !1
        }
    }

    function E(t, e) {
        var n = t.oFeatures,
            a = n.bFilter;
        n.bSort && It(t), a ? J(t, t.oPreviousSearch) : t.aiDisplay = t.aiDisplayMaster.slice(), !0 !== e && (t._iDisplayStart = 0), t._drawHold = e, H(t), t._drawHold = !1
    }

    function M(t) {
        var e = t.oClasses,
            n = L(t.nTable),
            a = (n = L("<div/>").insertBefore(n), t.oFeatures),
            o = L("<div/>", {
                id: t.sTableId + "_wrapper",
                class: e.sWrapper + (t.nTFoot ? "" : " " + e.sNoFooter)
            });
        t.nHolding = n[0], t.nTableWrapper = o[0], t.nTableReinsertBefore = t.nTable.nextSibling;
        for (var r, l, i, s, u, c, d = t.sDom.split(""), f = 0; f < d.length; f++) {
            if (r = null, "<" == (l = d[f])) {
                if (i = L("<div/>")[0], "'" == (s = d[f + 1]) || '"' == s) {
                    for (u = "", c = 2; d[f + c] != s;) u += d[f + c], c++;
                    "H" == u ? u = e.sJUIHeader : "F" == u && (u = e.sJUIFooter), -1 != u.indexOf(".") ? (s = u.split("."), i.id = s[0].substr(1, s[0].length - 1), i.className = s[1]) : "#" == u.charAt(0) ? i.id = u.substr(1, u.length - 1) : i.className = u, f += c
                }
                o.append(i), o = L(i)
            } else if (">" == l) o = o.parent();
            else if ("l" == l && a.bPaginate && a.bLengthChange) r = st(t);
            else if ("f" == l && a.bFilter) r = X(t);
            else if ("r" == l && a.bProcessing) r = dt(t);
            else if ("t" == l) r = pt(t);
            else if ("i" == l && a.bInfo) r = nt(t);
            else if ("p" == l && a.bPaginate) r = ut(t);
            else if (0 !== $t.ext.feature.length)
                for (c = 0, s = (i = $t.ext.feature).length; c < s; c++)
                    if (l == i[c].cFeature) {
                        r = i[c].fnInit(t);
                        break
                    }
            r && ((i = t.aanFeatures)[l] || (i[l] = []), i[l].push(r), o.append(r))
        }
        n.replaceWith(o), t.nHolding = null
    }

    function W(t, e) {
        var n, a, o, r, l, i, s, u, c, d, f = L(e).children("tr");
        for (t.splice(0, t.length), o = 0, i = f.length; o < i; o++) t.push([]);
        for (o = 0, i = f.length; o < i; o++)
            for (a = (n = f[o]).firstChild; a;) {
                if ("TD" == a.nodeName.toUpperCase() || "TH" == a.nodeName.toUpperCase()) {
                    for (u = (u = 1 * a.getAttribute("colspan")) && 0 !== u && 1 !== u ? u : 1, c = (c = 1 * a.getAttribute("rowspan")) && 0 !== c && 1 !== c ? c : 1, r = 0, l = t[o]; l[r];) r++;
                    for (s = r, d = 1 === u, l = 0; l < u; l++)
                        for (r = 0; r < c; r++) t[o + r][s + l] = {
                            cell: a,
                            unique: d
                        }, t[o + r].nTr = n
                }
                a = a.nextSibling
            }
    }

    function U(t, e, n) {
        var a = [];
        n || (n = t.aoHeader, e && W(n = [], e));
        e = 0;
        for (var o = n.length; e < o; e++)
            for (var r = 0, l = n[e].length; r < l; r++) !n[e][r].unique || a[r] && t.bSortCellsTop || (a[r] = n[e][r].cell);
        return a
    }

    function q(a, t, e) {
        if (jt(a, "aoServerParams", "serverParams", [t]), t && L.isArray(t)) {
            var o = {},
                r = /(.*?)\[\]$/;
            L.each(t, function(t, e) {
                var n = e.name.match(r);
                n ? (n = n[0], o[n] || (o[n] = []), o[n].push(e.value)) : o[e.name] = e.value
            }), t = o
        }
        var n, l = a.ajax,
            i = a.oInstance,
            s = function(t) {
                jt(a, null, "xhr", [a, t, a.jqXHR]), e(t)
            };
        if (L.isPlainObject(l) && l.data) {
            n = l.data;
            var u = L.isFunction(n) ? n(t, a) : n;
            t = L.isFunction(n) && u ? u : L.extend(!0, t, u);
            delete l.data
        }
        u = {
            data: t,
            success: function(t) {
                var e = t.error || t.sError;
                e && Bt(a, 0, e), a.json = t, s(t)
            },
            dataType: "json",
            cache: !1,
            type: a.sServerMethod,
            error: function(t, e) {
                var n = jt(a, null, "xhr", [a, null, a.jqXHR]); - 1 === L.inArray(!0, n) && ("parsererror" == e ? Bt(a, 0, "Invalid JSON response", 1) : 4 === t.readyState && Bt(a, 0, "Ajax error", 7)), ft(a, !1)
            }
        }, a.oAjaxData = t, jt(a, null, "preXhr", [a, t]), a.fnServerData ? a.fnServerData.call(i, a.sAjaxSource, L.map(t, function(t, e) {
            return {
                name: e,
                value: t
            }
        }), s, a) : a.sAjaxSource || "string" == typeof l ? a.jqXHR = L.ajax(L.extend(u, {
            url: l || a.sAjaxSource
        })) : L.isFunction(l) ? a.jqXHR = l.call(i, t, s, a) : (a.jqXHR = L.ajax(L.extend(u, l)), l.data = n)
    }

    function z(e) {
        return !e.bAjaxDataGet || (e.iDraw++, ft(e, !0), q(e, t(e), function(t) {
            V(e, t)
        }), !1)
    }

    function t(t) {
        var e, n, a, o, r = t.aoColumns,
            l = r.length,
            i = t.oFeatures,
            s = t.oPreviousSearch,
            u = t.aoPreSearchCols,
            c = [],
            d = St(t);
        e = t._iDisplayStart, n = !1 !== i.bPaginate ? t._iDisplayLength : -1;
        var f = function(t, e) {
            c.push({
                name: t,
                value: e
            })
        };
        f("sEcho", t.iDraw), f("iColumns", l), f("sColumns", oe(r, "sName").join(",")), f("iDisplayStart", e), f("iDisplayLength", n);
        var p = {
            draw: t.iDraw,
            columns: [],
            order: [],
            start: e,
            length: n,
            search: {
                value: s.sSearch,
                regex: s.bRegex
            }
        };
        for (e = 0; e < l; e++) a = r[e], o = u[e], n = "function" == typeof a.mData ? "function" : a.mData, p.columns.push({
            data: n,
            name: a.sName,
            searchable: a.bSearchable,
            orderable: a.bSortable,
            search: {
                value: o.sSearch,
                regex: o.bRegex
            }
        }), f("mDataProp_" + e, n), i.bFilter && (f("sSearch_" + e, o.sSearch), f("bRegex_" + e, o.bRegex), f("bSearchable_" + e, a.bSearchable)), i.bSort && f("bSortable_" + e, a.bSortable);
        return i.bFilter && (f("sSearch", s.sSearch), f("bRegex", s.bRegex)), i.bSort && (L.each(d, function(t, e) {
            p.order.push({
                column: e.col,
                dir: e.dir
            }), f("iSortCol_" + t, e.col), f("sSortDir_" + t, e.dir)
        }), f("iSortingCols", d.length)), null === (r = $t.ext.legacy.ajax) ? t.sAjaxSource ? c : p : r ? c : p
    }

    function V(t, e) {
        var n = $(t, e),
            a = e.sEcho !== R ? e.sEcho : e.draw,
            o = e.iTotalRecords !== R ? e.iTotalRecords : e.recordsTotal,
            r = e.iTotalDisplayRecords !== R ? e.iTotalDisplayRecords : e.recordsFiltered;
        if (a) {
            if (1 * a < t.iDraw) return;
            t.iDraw = 1 * a
        }
        for (i(t), t._iRecordsTotal = parseInt(o, 10), t._iRecordsDisplay = parseInt(r, 10), a = 0, o = n.length; a < o; a++) A(t, n[a]);
        t.aiDisplay = t.aiDisplayMaster.slice(), t.bAjaxDataGet = !1, H(t), t._bInitComplete || lt(t, e), t.bAjaxDataGet = !0, ft(t, !1)
    }

    function $(t, e) {
        var n = L.isPlainObject(t.ajax) && t.ajax.dataSrc !== R ? t.ajax.dataSrc : t.sAjaxDataProp;
        return "data" === n ? e.aaData || e[n] : "" !== n ? j(n)(e) : e
    }

    function X(n) {
        var t = n.oClasses,
            e = n.sTableId,
            a = n.oLanguage,
            o = n.oPreviousSearch,
            r = n.aanFeatures,
            l = '<input type="search" class="' + t.sFilterInput + '"/>',
            i = (i = a.sSearch).match(/_INPUT_/) ? i.replace("_INPUT_", l) : i + l,
            s = (t = L("<div/>", {
                id: r.f ? null : e + "_filter",
                class: t.sFilter
            }).append(L("<label/>").append(i)), r = function() {
                var t = this.value ? this.value : "";
                t != o.sSearch && (J(n, {
                    sSearch: t,
                    bRegex: o.bRegex,
                    bSmart: o.bSmart,
                    bCaseInsensitive: o.bCaseInsensitive
                }), n._iDisplayStart = 0, H(n))
            }, l = null !== n.searchDelay ? n.searchDelay : "ssp" === Et(n) ? 400 : 0, L("input", t).val(o.sSearch).attr("placeholder", a.sSearchPlaceholder).on("keyup.DT search.DT input.DT paste.DT cut.DT", l ? be(r, l) : r).on("keypress.DT", function(t) {
                if (13 == t.keyCode) return !1
            }).attr("aria-controls", e));
        return L(n.nTable).on("search.dt.DT", function(t, e) {
            if (n === e) try {
                s[0] !== y.activeElement && s.val(o.sSearch)
            } catch (t) {}
        }), t[0]
    }

    function J(t, e, n) {
        var a = t.oPreviousSearch,
            o = t.aoPreSearchCols,
            r = function(t) {
                a.sSearch = t.sSearch, a.bRegex = t.bRegex, a.bSmart = t.bSmart, a.bCaseInsensitive = t.bCaseInsensitive
            };
        if (l(t), "ssp" != Et(t)) {
            for (Y(t, e.sSearch, n, e.bEscapeRegex !== R ? !e.bEscapeRegex : e.bRegex, e.bSmart, e.bCaseInsensitive), r(e), e = 0; e < o.length; e++) K(t, o[e].sSearch, e, o[e].bEscapeRegex !== R ? !o[e].bEscapeRegex : o[e].bRegex, o[e].bSmart, o[e].bCaseInsensitive);
            G(t)
        } else r(e);
        t.bFiltered = !0, jt(t, null, "search", [t])
    }

    function G(t) {
        for (var e, n, a = $t.ext.search, o = t.aiDisplay, r = 0, l = a.length; r < l; r++) {
            for (var i = [], s = 0, u = o.length; s < u; s++) n = o[s], e = t.aoData[n], a[r](t, e._aFilterData, n, e._aData, s) && i.push(n);
            o.length = 0, L.merge(o, i)
        }
    }

    function K(t, e, n, a, o, r) {
        if ("" !== e) {
            var l = [],
                i = t.aiDisplay;
            for (a = Z(e, a, o, r), o = 0; o < i.length; o++) e = t.aoData[i[o]]._aFilterData[n], a.test(e) && l.push(i[o]);
            t.aiDisplay = l
        }
    }

    function Y(t, e, n, a, o, r) {
        a = Z(e, a, o, r), r = t.oPreviousSearch.sSearch;
        var l, i = t.aiDisplayMaster;
        o = [];
        if (0 !== $t.ext.search.length && (n = !0), l = Q(t), e.length <= 0) t.aiDisplay = i.slice();
        else {
            for ((l || n || r.length > e.length || 0 !== e.indexOf(r) || t.bSorted) && (t.aiDisplay = i.slice()), e = t.aiDisplay, n = 0; n < e.length; n++) a.test(t.aoData[e[n]]._sFilterRow) && o.push(e[n]);
            t.aiDisplay = o
        }
    }

    function Z(t, e, n, a) {
        return t = e ? t : fe(t), n && (t = "^(?=.*?" + L.map(t.match(/"[^"]+"|[^ ]+/g) || [""], function(t) {
            if ('"' === t.charAt(0)) {
                var e = t.match(/^"(.*)"$/);
                t = e ? e[1] : t
            }
            return t.replace('"', "")
        }).join(")(?=.*?") + ").*$"), RegExp(t, a ? "i" : "")
    }

    function Q(t) {
        var e, n, a, o, r, l, i, s, u = t.aoColumns,
            c = $t.ext.type.search;
        for (e = !1, n = 0, o = t.aoData.length; n < o; n++)
            if (!(s = t.aoData[n])._aFilterData) {
                for (l = [], a = 0, r = u.length; a < r; a++)(e = u[a]).bSearchable ? (i = B(t, n, a, "filter"), c[e.sType] && (i = c[e.sType](i)), null === i && (i = ""), "string" != typeof i && i.toString && (i = i.toString())) : i = "", i.indexOf && -1 !== i.indexOf("&") && (pe.innerHTML = i, i = he ? pe.textContent : pe.innerText), i.replace && (i = i.replace(/[\r\n]/g, "")), l.push(i);
                s._aFilterData = l, s._sFilterRow = l.join("  "), e = !0
            }
        return e
    }

    function tt(t) {
        return {
            search: t.sSearch,
            smart: t.bSmart,
            regex: t.bRegex,
            caseInsensitive: t.bCaseInsensitive
        }
    }

    function et(t) {
        return {
            sSearch: t.search,
            bSmart: t.smart,
            bRegex: t.regex,
            bCaseInsensitive: t.caseInsensitive
        }
    }

    function nt(t) {
        var e = t.sTableId,
            n = t.aanFeatures.i,
            a = L("<div/>", {
                class: t.oClasses.sInfo,
                id: n ? null : e + "_info"
            });
        return n || (t.aoDrawCallback.push({
            fn: at,
            sName: "information"
        }), a.attr("role", "status").attr("aria-live", "polite"), L(t.nTable).attr("aria-describedby", e + "_info")), a[0]
    }

    function at(t) {
        var e = t.aanFeatures.i;
        if (0 !== e.length) {
            var n = t.oLanguage,
                a = t._iDisplayStart + 1,
                o = t.fnDisplayEnd(),
                r = t.fnRecordsTotal(),
                l = t.fnRecordsDisplay(),
                i = l ? n.sInfo : n.sInfoEmpty;
            l !== r && (i += " " + n.sInfoFiltered), i = ot(t, i += n.sInfoPostFix), null !== (n = n.fnInfoCallback) && (i = n.call(t.oInstance, t, a, o, r, l, i)), L(e).html(i)
        }
    }

    function ot(t, e) {
        var n = t.fnFormatNumber,
            a = t._iDisplayStart + 1,
            o = t._iDisplayLength,
            r = t.fnRecordsDisplay(),
            l = -1 === o;
        return e.replace(/_START_/g, n.call(t, a)).replace(/_END_/g, n.call(t, t.fnDisplayEnd())).replace(/_MAX_/g, n.call(t, t.fnRecordsTotal())).replace(/_TOTAL_/g, n.call(t, r)).replace(/_PAGE_/g, n.call(t, l ? 1 : Math.ceil(a / o))).replace(/_PAGES_/g, n.call(t, l ? 1 : Math.ceil(r / o)))
    }

    function rt(n) {
        var a, t, e, o = n.iInitDisplayStart,
            r = n.aoColumns;
        t = n.oFeatures;
        var l = n.bDeferLoading;
        if (n.bInitialised) {
            for (M(n), b(n), O(n, n.aoHeader), O(n, n.aoFooter), ft(n, !0), t.bAutoWidth && bt(n), a = 0, t = r.length; a < t; a++)(e = r[a]).sWidth && (e.nTh.style.width = xt(e.sWidth));
            jt(n, null, "preInit", [n]), E(n), ("ssp" != (r = Et(n)) || l) && ("ajax" == r ? q(n, [], function(t) {
                var e = $(n, t);
                for (a = 0; a < e.length; a++) A(n, e[a]);
                n.iInitDisplayStart = o, E(n), ft(n, !1), lt(n, t)
            }) : (ft(n, !1), lt(n)))
        } else setTimeout(function() {
            rt(n)
        }, 200)
    }

    function lt(t, e) {
        t._bInitComplete = !0, (e || t.oInit.aaData) && P(t), jt(t, null, "plugin-init", [t, e]), jt(t, "aoInitComplete", "init", [t, e])
    }

    function it(t, e) {
        var n = parseInt(e, 10);
        t._iDisplayLength = n, Ot(t), jt(t, null, "length", [t, n])
    }

    function st(a) {
        for (var t = a.oClasses, e = a.sTableId, n = a.aLengthMenu, o = (r = L.isArray(n[0])) ? n[0] : n, r = (n = r ? n[1] : n, L("<select/>", {
                name: e + "_length",
                "aria-controls": e,
                class: t.sLengthSelect
            })), l = 0, i = o.length; l < i; l++) r[0][l] = new Option("number" == typeof n[l] ? a.fnFormatNumber(n[l]) : n[l], o[l]);
        var s = L("<div><label/></div>").addClass(t.sLength);
        return a.aanFeatures.l || (s[0].id = e + "_length"), s.children().append(a.oLanguage.sLengthMenu.replace("_MENU_", r[0].outerHTML)), L("select", s).val(a._iDisplayLength).on("change.DT", function() {
            it(a, L(this).val()), H(a)
        }), L(a.nTable).on("length.dt.DT", function(t, e, n) {
            a === e && L("select", s).val(n)
        }), s[0]
    }

    function ut(t) {
        var e = t.sPaginationType,
            l = $t.ext.pager[e],
            i = "function" == typeof l,
            s = function(t) {
                H(t)
            },
            u = (e = L("<div/>").addClass(t.oClasses.sPaging + e)[0], t.aanFeatures);
        return i || l.fnInit(t, e, s), u.p || (e.id = t.sTableId + "_paginate", t.aoDrawCallback.push({
            fn: function(t) {
                if (i) {
                    var e, n = t._iDisplayStart,
                        a = t._iDisplayLength,
                        o = t.fnRecordsDisplay(),
                        r = (n = (r = -1 === a) ? 0 : Math.ceil(n / a), a = r ? 1 : Math.ceil(o / a), o = l(n, a), 0);
                    for (e = u.p.length; r < e; r++) Ht(t, "pageButton")(t, u.p[r], r, o, n, a)
                } else l.fnUpdate(t, s)
            },
            sName: "pagination"
        })), e
    }

    function ct(t, e, n) {
        var a = t._iDisplayStart,
            o = t._iDisplayLength,
            r = t.fnRecordsDisplay();
        return 0 === r || -1 === o ? a = 0 : "number" == typeof e ? r < (a = e * o) && (a = 0) : "first" == e ? a = 0 : "previous" == e ? (a = 0 <= o ? a - o : 0) < 0 && (a = 0) : "next" == e ? a + o < r && (a += o) : "last" == e ? a = Math.floor((r - 1) / o) * o : Bt(t, 0, "Unknown paging action: " + e, 5), e = t._iDisplayStart !== a, t._iDisplayStart = a, e && (jt(t, null, "page", [t]), n && H(t)), e
    }

    function dt(t) {
        return L("<div/>", {
            id: t.aanFeatures.r ? null : t.sTableId + "_processing",
            class: t.oClasses.sProcessing
        }).html(t.oLanguage.sProcessing).insertBefore(t.nTable)[0]
    }

    function ft(t, e) {
        t.oFeatures.bProcessing && L(t.aanFeatures.r).css("display", e ? "block" : "none"), jt(t, null, "processing", [t, e])
    }

    function pt(t) {
        (c = L(t.nTable)).attr("role", "grid");
        var e = t.oScroll;
        if ("" === e.sX && "" === e.sY) return t.nTable;
        var n = e.sX,
            a = e.sY,
            o = t.oClasses,
            r = c.children("caption"),
            l = r.length ? r[0]._captionSide : null,
            i = L(c[0].cloneNode(!1)),
            s = L(c[0].cloneNode(!1)),
            u = c.children("tfoot");
        u.length || (u = null), i = L("<div/>", {
            class: o.sScrollWrapper
        }).append(L("<div/>", {
            class: o.sScrollHead
        }).css({
            overflow: "hidden",
            position: "relative",
            border: 0,
            width: n ? n ? xt(n) : null : "100%"
        }).append(L("<div/>", {
            class: o.sScrollHeadInner
        }).css({
            "box-sizing": "content-box",
            width: e.sXInner || "100%"
        }).append(i.removeAttr("id").css("margin-left", 0).append("top" === l ? r : null).append(c.children("thead"))))).append(L("<div/>", {
            class: o.sScrollBody
        }).css({
            position: "relative",
            overflow: "auto",
            width: n ? xt(n) : null
        }).append(c)), u && i.append(L("<div/>", {
            class: o.sScrollFoot
        }).css({
            overflow: "hidden",
            border: 0,
            width: n ? n ? xt(n) : null : "100%"
        }).append(L("<div/>", {
            class: o.sScrollFootInner
        }).append(s.removeAttr("id").css("margin-left", 0).append("bottom" === l ? r : null).append(c.children("tfoot")))));
        var c, d = (c = i.children())[0],
            f = (o = c[1], u ? c[2] : null);
        return n && L(o).on("scroll.DT", function() {
            var t = this.scrollLeft;
            d.scrollLeft = t, u && (f.scrollLeft = t)
        }), L(o).css(a && e.bCollapse ? "max-height" : "height", a), t.nScrollHead = d, t.nScrollBody = o, t.nScrollFoot = f, t.aoDrawCallback.push({
            fn: ht,
            sName: "scrolling"
        }), i[0]
    }

    function ht(n) {
        var t, e, a, o, r, l = (u = n.oScroll).sX,
            i = u.sXInner,
            s = u.sY,
            u = u.iBarWidth,
            c = L(n.nScrollHead),
            d = c[0].style,
            f = (h = c.children("div"))[0].style,
            p = h.children("table"),
            h = n.nScrollBody,
            m = L(h),
            b = h.style,
            g = L(n.nScrollFoot).children("div"),
            y = g.children("table"),
            v = L(n.nTHead),
            x = L(n.nTable),
            S = x[0],
            I = S.style,
            D = n.nTFoot ? L(n.nTFoot) : null,
            w = n.oBrowser,
            _ = w.bScrollOversize,
            T = oe(n.aoColumns, "nTh"),
            C = [],
            F = [],
            A = [],
            k = [],
            B = function(t) {
                (t = t.style).paddingTop = "0", t.paddingBottom = "0", t.borderTopWidth = "0", t.borderBottomWidth = "0", t.height = 0
            };
        e = h.scrollHeight > h.clientHeight, n.scrollBarVis !== e && n.scrollBarVis !== R ? (n.scrollBarVis = e, P(n)) : (n.scrollBarVis = e, x.children("thead, tfoot").remove(), D && (a = D.clone().prependTo(x), t = D.find("tr"), a = a.find("tr")), o = v.clone().prependTo(x), v = v.find("tr"), e = o.find("tr"), o.find("th, td").removeAttr("tabindex"), l || (b.width = "100%", c[0].style.width = "100%"), L.each(U(n, o), function(t, e) {
            r = N(n, t), e.style.width = n.aoColumns[r].sWidth
        }), D && mt(function(t) {
            t.style.width = ""
        }, a), c = x.outerWidth(), "" === l ? (I.width = "100%", _ && (x.find("tbody").height() > h.offsetHeight || "scroll" == m.css("overflow-y")) && (I.width = xt(x.outerWidth() - u)), c = x.outerWidth()) : "" !== i && (I.width = xt(i), c = x.outerWidth()), mt(B, e), mt(function(t) {
            A.push(t.innerHTML), C.push(xt(L(t).css("width")))
        }, e), mt(function(t, e) {
            -1 !== L.inArray(t, T) && (t.style.width = C[e])
        }, v), L(e).height(0), D && (mt(B, a), mt(function(t) {
            k.push(t.innerHTML), F.push(xt(L(t).css("width")))
        }, a), mt(function(t, e) {
            t.style.width = F[e]
        }, t), L(a).height(0)), mt(function(t, e) {
            t.innerHTML = '<div class="dataTables_sizing" style="height:0;overflow:hidden;">' + A[e] + "</div>", t.style.width = C[e]
        }, e), D && mt(function(t, e) {
            t.innerHTML = '<div class="dataTables_sizing" style="height:0;overflow:hidden;">' + k[e] + "</div>", t.style.width = F[e]
        }, a), x.outerWidth() < c ? (t = h.scrollHeight > h.offsetHeight || "scroll" == m.css("overflow-y") ? c + u : c, _ && (h.scrollHeight > h.offsetHeight || "scroll" == m.css("overflow-y")) && (I.width = xt(t - u)), ("" === l || "" !== i) && Bt(n, 1, "Possible column misalignment", 6)) : t = "100%", b.width = xt(t), d.width = xt(t), D && (n.nScrollFoot.style.width = xt(t)), !s && _ && (b.height = xt(S.offsetHeight + u)), l = x.outerWidth(), p[0].style.width = xt(l), f.width = xt(l), i = x.height() > h.clientHeight || "scroll" == m.css("overflow-y"), f[s = "padding" + (w.bScrollbarLeft ? "Left" : "Right")] = i ? u + "px" : "0px", D && (y[0].style.width = xt(l), g[0].style.width = xt(l), g[0].style[s] = i ? u + "px" : "0px"), x.children("colgroup").insertBefore(x.children("thead")), m.scroll(), !n.bSorted && !n.bFiltered || n._drawHold || (h.scrollTop = 0))
    }

    function mt(t, e, n) {
        for (var a, o, r = 0, l = 0, i = e.length; l < i;) {
            for (a = e[l].firstChild, o = n ? n[l].firstChild : null; a;) 1 === a.nodeType && (n ? t(a, o, r) : t(a, r), r++), a = a.nextSibling, o = n ? o.nextSibling : null;
            l++
        }
    }

    function bt(t) {
        var e, n, a = t.nTable,
            o = t.aoColumns,
            r = (m = t.oScroll).sY,
            l = m.sX,
            i = m.sXInner,
            s = o.length,
            u = C(t, "bVisible"),
            c = L("th", t.nTHead),
            d = a.getAttribute("width"),
            f = a.parentNode,
            p = !1,
            h = t.oBrowser,
            m = h.bScrollOversize;
        for ((e = a.style.width) && -1 !== e.indexOf("%") && (d = e), e = 0; e < u.length; e++) null !== (n = o[u[e]]).sWidth && (n.sWidth = gt(n.sWidthOrig, f), p = !0);
        if (m || !p && !l && !r && s == v(t) && s == c.length)
            for (e = 0; e < s; e++) null !== (u = N(t, e)) && (o[u].sWidth = xt(c.eq(e).width()));
        else {
            (s = L(a).clone().css("visibility", "hidden").removeAttr("id")).find("tbody tr").remove();
            var b = L("<tr/>").appendTo(s.find("tbody"));
            for (s.find("thead, tfoot").remove(), s.append(L(t.nTHead).clone()).append(L(t.nTFoot).clone()), s.find("tfoot th, tfoot td").css("width", ""), c = U(t, s.find("thead")[0]), e = 0; e < u.length; e++) n = o[u[e]], c[e].style.width = null !== n.sWidthOrig && "" !== n.sWidthOrig ? xt(n.sWidthOrig) : "", n.sWidthOrig && l && L(c[e]).append(L("<div/>").css({
                width: n.sWidthOrig,
                margin: 0,
                padding: 0,
                border: 0,
                height: 1
            }));
            if (t.aoData.length)
                for (e = 0; e < u.length; e++) n = o[p = u[e]], L(yt(t, p)).clone(!1).append(n.sContentPadding).appendTo(b);
            for (L("[name]", s).removeAttr("name"), n = L("<div/>").css(l || r ? {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: 1,
                    right: 0,
                    overflow: "hidden"
                } : {}).append(s).appendTo(f), l && i ? s.width(i) : l ? (s.css("width", "auto"), s.removeAttr("width"), s.width() < f.clientWidth && d && s.width(f.clientWidth)) : r ? s.width(f.clientWidth) : d && s.width(d), e = r = 0; e < u.length; e++) i = (f = L(c[e])).outerWidth() - f.width(), r += f = h.bBounding ? Math.ceil(c[e].getBoundingClientRect().width) : f.outerWidth(), o[u[e]].sWidth = xt(f - i);
            a.style.width = xt(r), n.remove()
        }
        d && (a.style.width = xt(d)), !d && !l || t._reszEvt || (a = function() {
            L(g).on("resize.DT-" + t.sInstance, be(function() {
                P(t)
            }))
        }, m ? setTimeout(a, 1e3) : a(), t._reszEvt = !0)
    }

    function gt(t, e) {
        if (!t) return 0;
        var n = L("<div/>").css("width", xt(t)).appendTo(e || y.body),
            a = n[0].offsetWidth;
        return n.remove(), a
    }

    function yt(t, e) {
        var n = vt(t, e);
        if (n < 0) return null;
        var a = t.aoData[n];
        return a.nTr ? a.anCells[e] : L("<td/>").html(B(t, n, e, "display"))[0]
    }

    function vt(t, e) {
        for (var n, a = -1, o = -1, r = 0, l = t.aoData.length; r < l; r++)(n = (n = (n = B(t, r, e, "display") + "").replace(me, "")).replace(/&nbsp;/g, " ")).length > a && (a = n.length, o = r);
        return o
    }

    function xt(t) {
        return null === t ? "0px" : "number" == typeof t ? t < 0 ? "0px" : t + "px" : t.match(/\d$/) ? t + "px" : t
    }

    function St(t) {
        var e, n, a, o, r, l, i = [],
            s = t.aoColumns;
        e = t.aaSortingFixed, n = L.isPlainObject(e);
        var u = [];
        for (a = function(t) {
                t.length && !L.isArray(t[0]) ? u.push(t) : L.merge(u, t)
            }, L.isArray(e) && a(e), n && e.pre && a(e.pre), a(t.aaSorting), n && e.post && a(e.post), t = 0; t < u.length; t++)
            for (e = 0, n = (a = s[l = u[t][0]].aDataSort).length; e < n; e++) r = s[o = a[e]].sType || "string", u[t]._idx === R && (u[t]._idx = L.inArray(u[t][1], s[o].asSorting)), i.push({
                src: l,
                col: o,
                dir: u[t][1],
                index: u[t]._idx,
                type: r,
                formatter: $t.ext.type.order[r + "-pre"]
            });
        return i
    }

    function It(t) {
        var e, n, a, u, c = [],
            d = $t.ext.type.order,
            f = t.aoData,
            o = 0,
            r = t.aiDisplayMaster;
        for (l(t), e = 0, n = (u = St(t)).length; e < n; e++)(a = u[e]).formatter && o++, Ct(t, a.col);
        if ("ssp" != Et(t) && 0 !== u.length) {
            for (e = 0, n = r.length; e < n; e++) c[r[e]] = e;
            o === u.length ? r.sort(function(t, e) {
                var n, a, o, r, l = u.length,
                    i = f[t]._aSortData,
                    s = f[e]._aSortData;
                for (o = 0; o < l; o++)
                    if (0 !== (n = (n = i[(r = u[o]).col]) < (a = s[r.col]) ? -1 : a < n ? 1 : 0)) return "asc" === r.dir ? n : -n;
                return (n = c[t]) < (a = c[e]) ? -1 : a < n ? 1 : 0
            }) : r.sort(function(t, e) {
                var n, a, o, r, l = u.length,
                    i = f[t]._aSortData,
                    s = f[e]._aSortData;
                for (o = 0; o < l; o++)
                    if (n = i[(r = u[o]).col], a = s[r.col], 0 !== (n = (r = d[r.type + "-" + r.dir] || d["string-" + r.dir])(n, a))) return n;
                return (n = c[t]) < (a = c[e]) ? -1 : a < n ? 1 : 0
            })
        }
        t.bSorted = !0
    }

    function Dt(t) {
        for (var e, n, a = t.aoColumns, o = St(t), r = (t = t.oLanguage.oAria, 0), l = a.length; r < l; r++) {
            var i = (n = a[r]).asSorting;
            e = n.sTitle.replace(/<.*?>/g, "");
            var s = n.nTh;
            s.removeAttribute("aria-sort"), n.bSortable && (e += "asc" === (n = 0 < o.length && o[0].col == r ? (s.setAttribute("aria-sort", "asc" == o[0].dir ? "ascending" : "descending"), i[o[0].index + 1] || i[0]) : i[0]) ? t.sSortAscending : t.sSortDescending), s.setAttribute("aria-label", e)
        }
    }

    function wt(t, e, n, a) {
        var o = t.aaSorting,
            r = t.aoColumns[e].asSorting,
            l = function(t, e) {
                var n = t._idx;
                return n === R && (n = L.inArray(t[1], r)), n + 1 < r.length ? n + 1 : e ? null : 0
            };
        "number" == typeof o[0] && (o = t.aaSorting = [o]), n && t.oFeatures.bSortMulti ? -1 !== (n = L.inArray(e, oe(o, "0"))) ? (null === (e = l(o[n], !0)) && 1 === o.length && (e = 0), null === e ? o.splice(n, 1) : (o[n][1] = r[e], o[n]._idx = e)) : (o.push([e, r[0], 0]), o[o.length - 1]._idx = 0) : o.length && o[0][0] == e ? (e = l(o[0]), o.length = 1, o[0][1] = r[e], o[0]._idx = e) : (o.length = 0, o.push([e, r[0]]), o[0]._idx = 0), E(t), "function" == typeof a && a(t)
    }

    function _t(e, t, n, a) {
        var o = e.aoColumns[n];
        Pt(t, {}, function(t) {
            !1 !== o.bSortable && (e.oFeatures.bProcessing ? (ft(e, !0), setTimeout(function() {
                wt(e, n, t.shiftKey, a), "ssp" !== Et(e) && ft(e, !1)
            }, 0)) : wt(e, n, t.shiftKey, a))
        })
    }

    function Tt(t) {
        var e, n, a = t.aLastSort,
            o = t.oClasses.sSortColumn,
            r = St(t),
            l = t.oFeatures;
        if (l.bSort && l.bSortClasses) {
            for (l = 0, e = a.length; l < e; l++) n = a[l].src, L(oe(t.aoData, "anCells", n)).removeClass(o + (l < 2 ? l + 1 : 3));
            for (l = 0, e = r.length; l < e; l++) n = r[l].src, L(oe(t.aoData, "anCells", n)).addClass(o + (l < 2 ? l + 1 : 3))
        }
        t.aLastSort = r
    }

    function Ct(t, e) {
        var n, a = t.aoColumns[e],
            o = $t.ext.order[a.sSortDataType];
        o && (n = o.call(t.oInstance, t, e, u(t, e)));
        for (var r, l = $t.ext.type.order[a.sType + "-pre"], i = 0, s = t.aoData.length; i < s; i++)(a = t.aoData[i])._aSortData || (a._aSortData = []), (!a._aSortData[e] || o) && (r = o ? n[i] : B(t, i, e, "sort"), a._aSortData[e] = l ? l(r) : r)
    }

    function Ft(n) {
        if (n.oFeatures.bStateSave && !n.bDestroying) {
            var t = {
                time: +new Date,
                start: n._iDisplayStart,
                length: n._iDisplayLength,
                order: L.extend(!0, [], n.aaSorting),
                search: tt(n.oPreviousSearch),
                columns: L.map(n.aoColumns, function(t, e) {
                    return {
                        visible: t.bVisible,
                        search: tt(n.aoPreSearchCols[e])
                    }
                })
            };
            jt(n, "aoStateSaveParams", "stateSaveParams", [n, t]), n.oSavedState = t, n.fnStateSaveCallback.call(n.oInstance, n, t)
        }
    }

    function At(n, t, a) {
        var o, r, l = n.aoColumns;
        t = function(t) {
            if (t && t.time) {
                var e = jt(n, "aoStateLoadParams", "stateLoadParams", [n, t]);
                if (-1 === L.inArray(!1, e) && !(0 < (e = n.iStateDuration) && t.time < +new Date - 1e3 * e || t.columns && l.length !== t.columns.length)) {
                    if (n.oLoadedState = L.extend(!0, {}, t), t.start !== R && (n._iDisplayStart = t.start, n.iInitDisplayStart = t.start), t.length !== R && (n._iDisplayLength = t.length), t.order !== R && (n.aaSorting = [], L.each(t.order, function(t, e) {
                            n.aaSorting.push(e[0] >= l.length ? [0, e[1]] : e)
                        })), t.search !== R && L.extend(n.oPreviousSearch, et(t.search)), t.columns)
                        for (o = 0, r = t.columns.length; o < r; o++)(e = t.columns[o]).visible !== R && (l[o].bVisible = e.visible), e.search !== R && L.extend(n.aoPreSearchCols[o], et(e.search));
                    jt(n, "aoStateLoaded", "stateLoaded", [n, t])
                }
            }
            a()
        };
        if (n.oFeatures.bStateSave) {
            var e = n.fnStateLoadCallback.call(n.oInstance, n, t);
            e !== R && t(e)
        } else a()
    }

    function kt(t) {
        var e = $t.settings;
        return -1 !== (t = L.inArray(t, oe(e, "nTable"))) ? e[t] : null
    }

    function Bt(t, e, n, a) {
        if (n = "DataTables warning: " + (t ? "table id=" + t.sTableId + " - " : "") + n, a && (n += ". For more information about this error, please see http://datatables.net/tn/" + a), e) g.console && console.log && console.log(n);
        else if (e = (e = $t.ext).sErrMode || e.errMode, t && jt(t, null, "error", [t, a, n]), "alert" == e) alert(n);
        else {
            if ("throw" == e) throw Error(n);
            "function" == typeof e && e(t, a, n)
        }
    }

    function Lt(n, a, t, e) {
        L.isArray(t) ? L.each(t, function(t, e) {
            L.isArray(e) ? Lt(n, a, e[0], e[1]) : Lt(n, a, e)
        }) : (e === R && (e = t), a[t] !== R && (n[e] = a[t]))
    }

    function Rt(t, e, n) {
        var a, o;
        for (o in e) e.hasOwnProperty(o) && (a = e[o], L.isPlainObject(a) ? (L.isPlainObject(t[o]) || (t[o] = {}), L.extend(!0, t[o], a)) : t[o] = n && "data" !== o && "aaData" !== o && L.isArray(a) ? a.slice() : a);
        return t
    }

    function Pt(e, t, n) {
        L(e).on("click.DT", t, function(t) {
            e.blur(), n(t)
        }).on("keypress.DT", t, function(t) {
            13 === t.which && (t.preventDefault(), n(t))
        }).on("selectstart.DT", function() {
            return !1
        })
    }

    function Nt(t, e, n, a) {
        n && t[e].push({
            fn: n,
            sName: a
        })
    }

    function jt(e, t, n, a) {
        var o = [];
        return t && (o = L.map(e[t].slice().reverse(), function(t) {
            return t.fn.apply(e.oInstance, a)
        })), null !== n && (t = L.Event(n + ".dt"), L(e.nTable).trigger(t, a), o.push(t.result)), o
    }

    function Ot(t) {
        var e = t._iDisplayStart,
            n = t.fnDisplayEnd(),
            a = t._iDisplayLength;
        n <= e && (e = n - a), e -= e % a, (-1 === a || e < 0) && (e = 0), t._iDisplayStart = e
    }

    function Ht(t, e) {
        var n = t.renderer,
            a = $t.ext.renderer[e];
        return L.isPlainObject(n) && n[e] ? a[n[e]] || a._ : "string" == typeof n && a[n] || a._
    }

    function Et(t) {
        return t.oFeatures.bServerSide ? "ssp" : t.ajax || t.sAjaxSource ? "ajax" : "dom"
    }

    function Mt(t, e) {
        var n = [],
            a = (n = Fe.numbers_length, Math.floor(n / 2));
        return e <= n ? n = le(0, e) : t <= a ? ((n = le(0, n - 2)).push("ellipsis"), n.push(e - 1)) : (e - 1 - a <= t ? n = le(e - (n - 2), e) : ((n = le(t - a + 2, t + a - 1)).push("ellipsis"), n.push(e - 1)), n.splice(0, 0, "ellipsis"), n.splice(0, 0, 0)), n.DT_el = "span", n
    }

    function Wt(n) {
        L.each({
            num: function(t) {
                return Ae(t, n)
            },
            "num-fmt": function(t) {
                return Ae(t, n, Zt)
            },
            "html-num": function(t) {
                return Ae(t, n, Gt)
            },
            "html-num-fmt": function(t) {
                return Ae(t, n, Gt, Zt)
            }
        }, function(t, e) {
            Ut.type.order[t + n + "-pre"] = e, t.match(/^html\-/) && (Ut.type.search[t + n] = Ut.type.search.html)
        })
    }

    function e(e) {
        return function() {
            var t = [kt(this[$t.ext.iApiIndex])].concat(Array.prototype.slice.call(arguments));
            return $t.ext.internal[e].apply(this, t)
        }
    }
    var Ut, qt, zt, Vt, $t = function(b) {
            this.$ = function(t, e) {
                return this.api(!0).$(t, e)
            }, this._ = function(t, e) {
                return this.api(!0).rows(t, e).data()
            }, this.api = function(t) {
                return new qt(t ? kt(this[Ut.iApiIndex]) : this)
            }, this.fnAddData = function(t, e) {
                var n = this.api(!0),
                    a = L.isArray(t) && (L.isArray(t[0]) || L.isPlainObject(t[0])) ? n.rows.add(t) : n.row.add(t);
                return (e === R || e) && n.draw(), a.flatten().toArray()
            }, this.fnAdjustColumnSizing = function(t) {
                var e = this.api(!0).columns.adjust(),
                    n = e.settings()[0],
                    a = n.oScroll;
                t === R || t ? e.draw(!1) : ("" !== a.sX || "" !== a.sY) && ht(n)
            }, this.fnClearTable = function(t) {
                var e = this.api(!0).clear();
                (t === R || t) && e.draw()
            }, this.fnClose = function(t) {
                this.api(!0).row(t).child.hide()
            }, this.fnDeleteRow = function(t, e, n) {
                var a = this.api(!0),
                    o = (t = a.rows(t)).settings()[0],
                    r = o.aoData[t[0][0]];
                return t.remove(), e && e.call(this, o, r), (n === R || n) && a.draw(), r
            }, this.fnDestroy = function(t) {
                this.api(!0).destroy(t)
            }, this.fnDraw = function(t) {
                this.api(!0).draw(t)
            }, this.fnFilter = function(t, e, n, a, o, r) {
                o = this.api(!0), null === e || e === R ? o.search(t, n, a, r) : o.column(e).search(t, n, a, r), o.draw()
            }, this.fnGetData = function(t, e) {
                var n = this.api(!0);
                if (t === R) return n.data().toArray();
                var a = t.nodeName ? t.nodeName.toLowerCase() : "";
                return e !== R || "td" == a || "th" == a ? n.cell(t, e).data() : n.row(t).data() || null
            }, this.fnGetNodes = function(t) {
                var e = this.api(!0);
                return t !== R ? e.row(t).node() : e.rows().nodes().flatten().toArray()
            }, this.fnGetPosition = function(t) {
                var e = this.api(!0),
                    n = t.nodeName.toUpperCase();
                return "TR" == n ? e.row(t).index() : "TD" == n || "TH" == n ? [(t = e.cell(t).index()).row, t.columnVisible, t.column] : null
            }, this.fnIsOpen = function(t) {
                return this.api(!0).row(t).child.isShown()
            }, this.fnOpen = function(t, e, n) {
                return this.api(!0).row(t).child(e, n).show().child()[0]
            }, this.fnPageChange = function(t, e) {
                var n = this.api(!0).page(t);
                (e === R || e) && n.draw(!1)
            }, this.fnSetColumnVis = function(t, e, n) {
                t = this.api(!0).column(t).visible(e), (n === R || n) && t.columns.adjust().draw()
            }, this.fnSettings = function() {
                return kt(this[Ut.iApiIndex])
            }, this.fnSort = function(t) {
                this.api(!0).order(t).draw()
            }, this.fnSortListener = function(t, e, n) {
                this.api(!0).order.listener(t, e, n)
            }, this.fnUpdate = function(t, e, n, a, o) {
                var r = this.api(!0);
                return n === R || null === n ? r.row(e).data(t) : r.cell(e, n).data(t), (o === R || o) && r.columns.adjust(), (a === R || a) && r.draw(), 0
            }, this.fnVersionCheck = Ut.fnVersionCheck;
            var g = this,
                y = b === R,
                v = this.length;
            for (var t in y && (b = {}), this.oApi = this.internal = Ut.internal, $t.ext.internal) t && (this[t] = e(t));
            return this.each(function() {
                var n, t = {},
                    a = 1 < v ? Rt(t, b, !0) : b,
                    o = 0,
                    r = (t = this.getAttribute("id"), !1),
                    e = $t.defaults,
                    l = L(this);
                if ("table" != this.nodeName.toLowerCase()) Bt(null, 0, "Non-table node initialisation (" + this.nodeName + ")", 2);
                else {
                    I(e), D(e.column), x(e, e, !0), x(e.column, e.column, !0), x(e, L.extend(a, l.data()));
                    var i = $t.settings;
                    o = 0;
                    for (n = i.length; o < n; o++) {
                        var s = i[o];
                        if (s.nTable == this || s.nTHead.parentNode == this || s.nTFoot && s.nTFoot.parentNode == this) {
                            var u = a.bRetrieve !== R ? a.bRetrieve : e.bRetrieve;
                            if (y || u) return s.oInstance;
                            if (a.bDestroy !== R ? a.bDestroy : e.bDestroy) {
                                s.oInstance.fnDestroy();
                                break
                            }
                            return void Bt(s, 0, "Cannot reinitialise DataTable", 3)
                        }
                        if (s.sTableId == this.id) {
                            i.splice(o, 1);
                            break
                        }
                    }
                    null !== t && "" !== t || (this.id = t = "DataTables_Table_" + $t.ext._unique++);
                    var c = L.extend(!0, {}, $t.models.oSettings, {
                        sDestroyWidth: l[0].style.width,
                        sInstance: t,
                        sTableId: t
                    });
                    c.nTable = this, c.oApi = g.internal, c.oInit = a, i.push(c), c.oInstance = 1 === g.length ? g : l.dataTable(), I(a), a.oLanguage && S(a.oLanguage), a.aLengthMenu && !a.iDisplayLength && (a.iDisplayLength = L.isArray(a.aLengthMenu[0]) ? a.aLengthMenu[0][0] : a.aLengthMenu[0]), a = Rt(L.extend(!0, {}, e), a), Lt(c.oFeatures, a, "bPaginate bLengthChange bFilter bSort bSortMulti bInfo bProcessing bAutoWidth bSortClasses bServerSide bDeferRender".split(" ")), Lt(c, a, ["asStripeClasses", "ajax", "fnServerData", "fnFormatNumber", "sServerMethod", "aaSorting", "aaSortingFixed", "aLengthMenu", "sPaginationType", "sAjaxSource", "sAjaxDataProp", "iStateDuration", "sDom", "bSortCellsTop", "iTabIndex", "fnStateLoadCallback", "fnStateSaveCallback", "renderer", "searchDelay", "rowId", ["iCookieDuration", "iStateDuration"],
                        ["oSearch", "oPreviousSearch"],
                        ["aoSearchCols", "aoPreSearchCols"],
                        ["iDisplayLength", "_iDisplayLength"]
                    ]), Lt(c.oScroll, a, [
                        ["sScrollX", "sX"],
                        ["sScrollXInner", "sXInner"],
                        ["sScrollY", "sY"],
                        ["bScrollCollapse", "bCollapse"]
                    ]), Lt(c.oLanguage, a, "fnInfoCallback"), Nt(c, "aoDrawCallback", a.fnDrawCallback, "user"), Nt(c, "aoServerParams", a.fnServerParams, "user"), Nt(c, "aoStateSaveParams", a.fnStateSaveParams, "user"), Nt(c, "aoStateLoadParams", a.fnStateLoadParams, "user"), Nt(c, "aoStateLoaded", a.fnStateLoaded, "user"), Nt(c, "aoRowCallback", a.fnRowCallback, "user"), Nt(c, "aoRowCreatedCallback", a.fnCreatedRow, "user"), Nt(c, "aoHeaderCallback", a.fnHeaderCallback, "user"), Nt(c, "aoFooterCallback", a.fnFooterCallback, "user"), Nt(c, "aoInitComplete", a.fnInitComplete, "user"), Nt(c, "aoPreDrawCallback", a.fnPreDrawCallback, "user"), c.rowIdFn = j(a.rowId), w(c);
                    var d = c.oClasses;
                    L.extend(d, $t.ext.classes, a.oClasses), l.addClass(d.sTable), c.iInitDisplayStart === R && (c.iInitDisplayStart = a.iDisplayStart, c._iDisplayStart = a.iDisplayStart), null !== a.iDeferLoading && (c.bDeferLoading = !0, t = L.isArray(a.iDeferLoading), c._iRecordsDisplay = t ? a.iDeferLoading[0] : a.iDeferLoading, c._iRecordsTotal = t ? a.iDeferLoading[1] : a.iDeferLoading);
                    var f = c.oLanguage;
                    L.extend(!0, f, a.oLanguage), f.sUrl && (L.ajax({
                        dataType: "json",
                        url: f.sUrl,
                        success: function(t) {
                            S(t), x(e.oLanguage, t), L.extend(!0, f, t), rt(c)
                        },
                        error: function() {
                            rt(c)
                        }
                    }), r = !0), null === a.asStripeClasses && (c.asStripeClasses = [d.sStripeOdd, d.sStripeEven]);
                    t = c.asStripeClasses;
                    var p = l.children("tbody").find("tr").eq(0);
                    if (-1 !== L.inArray(!0, L.map(t, function(t) {
                            return p.hasClass(t)
                        })) && (L("tbody tr", this).removeClass(t.join(" ")), c.asDestroyStripes = t.slice()), t = [], 0 !== (i = this.getElementsByTagName("thead")).length && (W(c.aoHeader, i[0]), t = U(c)), null === a.aoColumns)
                        for (i = [], o = 0, n = t.length; o < n; o++) i.push(null);
                    else i = a.aoColumns;
                    for (o = 0, n = i.length; o < n; o++) _(c, t ? t[o] : null);
                    if (F(c, a.aoColumnDefs, i, function(t, e) {
                            T(c, t, e)
                        }), p.length) {
                        var h = function(t, e) {
                            return null !== t.getAttribute("data-" + e) ? e : null
                        };
                        L(p[0]).children("th, td").each(function(t, e) {
                            var n = c.aoColumns[t];
                            if (n.mData === t) {
                                var a = h(e, "sort") || h(e, "order"),
                                    o = h(e, "filter") || h(e, "search");
                                null === a && null === o || (n.mData = {
                                    _: t + ".display",
                                    sort: null !== a ? t + ".@data-" + a : R,
                                    type: null !== a ? t + ".@data-" + a : R,
                                    filter: null !== o ? t + ".@data-" + o : R
                                }, T(c, t))
                            }
                        })
                    }
                    var m = c.oFeatures;
                    t = function() {
                        if (a.aaSorting === R) {
                            var t = c.aaSorting;
                            for (o = 0, n = t.length; o < n; o++) t[o][1] = c.aoColumns[o].asSorting[0]
                        }
                        Tt(c), m.bSort && Nt(c, "aoDrawCallback", function() {
                            if (c.bSorted) {
                                var t = St(c),
                                    n = {};
                                L.each(t, function(t, e) {
                                    n[e.src] = e.dir
                                }), jt(c, null, "order", [c, t, n]), Dt(c)
                            }
                        }), Nt(c, "aoDrawCallback", function() {
                            (c.bSorted || "ssp" === Et(c) || m.bDeferRender) && Tt(c)
                        }, "sc");
                        t = l.children("caption").each(function() {
                            this._captionSide = L(this).css("caption-side")
                        });
                        var e = l.children("thead");
                        if (0 === e.length && (e = L("<thead/>").appendTo(l)), c.nTHead = e[0], 0 === (e = l.children("tbody")).length && (e = L("<tbody/>").appendTo(l)), c.nTBody = e[0], 0 === (e = l.children("tfoot")).length && 0 < t.length && ("" !== c.oScroll.sX || "" !== c.oScroll.sY) && (e = L("<tfoot/>").appendTo(l)), 0 === e.length || 0 === e.children().length ? l.addClass(d.sNoFooter) : 0 < e.length && (c.nTFoot = e[0], W(c.aoFooter, c.nTFoot)), a.aaData)
                            for (o = 0; o < a.aaData.length; o++) A(c, a.aaData[o]);
                        else(c.bDeferLoading || "dom" == Et(c)) && k(c, L(c.nTBody).children("tr"));
                        c.aiDisplay = c.aiDisplayMaster.slice(), !(c.bInitialised = !0) === r && rt(c)
                    };
                    a.bStateSave ? (m.bStateSave = !0, Nt(c, "aoDrawCallback", Ft, "state_save"), At(c, a, t)) : t()
                }
            }), g = null, this
        },
        Xt = {},
        Jt = /[\r\n]/g,
        Gt = /<.*?>/g,
        Kt = /^\d{2,4}[\.\/\-]\d{1,2}[\.\/\-]\d{1,2}([T ]{1}\d{1,2}[:\.]\d{2}([\.:]\d{2})?)?$/,
        Yt = RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\|\\$|\\^|\\-)", "g"),
        Zt = /[',$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfk]/gi,
        Qt = function(t) {
            return !t || !0 === t || "-" === t
        },
        te = function(t) {
            var e = parseInt(t, 10);
            return !isNaN(e) && isFinite(t) ? e : null
        },
        ee = function(t, e) {
            return Xt[e] || (Xt[e] = RegExp(fe(e), "g")), "string" == typeof t && "." !== e ? t.replace(/\./g, "").replace(Xt[e], ".") : t
        },
        ne = function(t, e, n) {
            var a = "string" == typeof t;
            return !!Qt(t) || (e && a && (t = ee(t, e)), n && a && (t = t.replace(Zt, "")), !isNaN(parseFloat(t)) && isFinite(t))
        },
        ae = function(t, e, n) {
            return !!Qt(t) || ((Qt(t) || "string" == typeof t) && !!ne(t.replace(Gt, ""), e, n) || null)
        },
        oe = function(t, e, n) {
            var a = [],
                o = 0,
                r = t.length;
            if (n !== R)
                for (; o < r; o++) t[o] && t[o][e] && a.push(t[o][e][n]);
            else
                for (; o < r; o++) t[o] && a.push(t[o][e]);
            return a
        },
        re = function(t, e, n, a) {
            var o = [],
                r = 0,
                l = e.length;
            if (a !== R)
                for (; r < l; r++) t[e[r]][n] && o.push(t[e[r]][n][a]);
            else
                for (; r < l; r++) o.push(t[e[r]][n]);
            return o
        },
        le = function(t, e) {
            var n, a = [];
            e === R ? (e = 0, n = t) : (n = e, e = t);
            for (var o = e; o < n; o++) a.push(o);
            return a
        },
        ie = function(t) {
            for (var e = [], n = 0, a = t.length; n < a; n++) t[n] && e.push(t[n]);
            return e
        },
        se = function(t) {
            var e;
            t: {
                if (!(t.length < 2))
                    for (var n = (e = t.slice().sort())[0], a = 1, o = e.length; a < o; a++) {
                        if (e[a] === n) {
                            e = !1;
                            break t
                        }
                        n = e[a]
                    }
                e = !0
            }
            if (e) return t.slice();
            e = [];
            o = t.length;
            var r, l = 0;
            a = 0;
            t: for (; a < o; a++) {
                for (n = t[a], r = 0; r < l; r++)
                    if (e[r] === n) continue t;
                e.push(n), l++
            }
            return e
        };
    $t.util = {
        throttle: function(a, t) {
            var o, r, l = t !== R ? t : 200;
            return function() {
                var t = this,
                    e = +new Date,
                    n = arguments;
                o && e < o + l ? (clearTimeout(r), r = setTimeout(function() {
                    o = R, a.apply(t, n)
                }, l)) : (o = e, a.apply(t, n))
            }
        },
        escapeRegex: function(t) {
            return t.replace(Yt, "\\$1")
        }
    };
    var ue = function(t, e, n) {
            t[e] !== R && (t[n] = t[e])
        },
        ce = /\[.*?\]$/,
        de = /\(\)$/,
        fe = $t.util.escapeRegex,
        pe = L("<div>")[0],
        he = pe.textContent !== R,
        me = /<.*?>/g,
        be = $t.util.throttle,
        ge = [],
        ye = Array.prototype;
    qt = function(t, e) {
        if (!(this instanceof qt)) return new qt(t, e);
        var l = [],
            n = function(t) {
                var e, n, a, o, r;
                e = t, o = $t.settings, r = L.map(o, function(t) {
                    return t.nTable
                }), (t = e ? e.nTable && e.oApi ? [e] : e.nodeName && "table" === e.nodeName.toLowerCase() ? -1 !== (n = L.inArray(e, r)) ? [o[n]] : null : e && "function" == typeof e.settings ? e.settings().toArray() : ("string" == typeof e ? a = L(e) : e instanceof L && (a = e), a ? a.map(function() {
                    return -1 !== (n = L.inArray(this, r)) ? o[n] : null
                }).toArray() : void 0) : []) && (l = l.concat(t))
            };
        if (L.isArray(t))
            for (var a = 0, o = t.length; a < o; a++) n(t[a]);
        else n(t);
        this.context = se(l), e && L.merge(this, e), this.selector = {
            rows: null,
            cols: null,
            opts: null
        }, qt.extend(this, this, ge)
    }, $t.Api = qt, L.extend(qt.prototype, {
        any: function() {
            return 0 !== this.count()
        },
        concat: ye.concat,
        context: [],
        count: function() {
            return this.flatten().length
        },
        each: function(t) {
            for (var e = 0, n = this.length; e < n; e++) t.call(this, this[e], e, this);
            return this
        },
        eq: function(t) {
            var e = this.context;
            return e.length > t ? new qt(e[t], this[t]) : null
        },
        filter: function(t) {
            var e = [];
            if (ye.filter) e = ye.filter.call(this, t, this);
            else
                for (var n = 0, a = this.length; n < a; n++) t.call(this, this[n], n, this) && e.push(this[n]);
            return new qt(this.context, e)
        },
        flatten: function() {
            var t = [];
            return new qt(this.context, t.concat.apply(t, this.toArray()))
        },
        join: ye.join,
        indexOf: ye.indexOf || function(t, e) {
            for (var n = e || 0, a = this.length; n < a; n++)
                if (this[n] === t) return n;
            return -1
        },
        iterator: function(t, e, n, a) {
            var o, r, l, i, s, u, c, d = [],
                f = this.context,
                p = this.selector;
            for ("string" == typeof t && (a = n, n = e, e = t, t = !1), r = 0, l = f.length; r < l; r++) {
                var h = new qt(f[r]);
                if ("table" === e)(o = n.call(h, f[r], r)) !== R && d.push(o);
                else if ("columns" === e || "rows" === e)(o = n.call(h, f[r], this[r], r)) !== R && d.push(o);
                else if ("column" === e || "column-rows" === e || "row" === e || "cell" === e)
                    for (c = this[r], "column-rows" === e && (u = De(f[r], p.opts)), i = 0, s = c.length; i < s; i++) o = c[i], (o = "cell" === e ? n.call(h, f[r], o.row, o.column, r, i) : n.call(h, f[r], o, r, i, u)) !== R && d.push(o)
            }
            return d.length || a ? ((e = (t = new qt(f, t ? d.concat.apply([], d) : d)).selector).rows = p.rows, e.cols = p.cols, e.opts = p.opts, t) : this
        },
        lastIndexOf: ye.lastIndexOf || function(t, e) {
            return this.indexOf.apply(this.toArray.reverse(), arguments)
        },
        length: 0,
        map: function(t) {
            var e = [];
            if (ye.map) e = ye.map.call(this, t, this);
            else
                for (var n = 0, a = this.length; n < a; n++) e.push(t.call(this, this[n], n));
            return new qt(this.context, e)
        },
        pluck: function(e) {
            return this.map(function(t) {
                return t[e]
            })
        },
        pop: ye.pop,
        push: ye.push,
        reduce: ye.reduce || function(t, e) {
            return n(this, t, e, 0, this.length, 1)
        },
        reduceRight: ye.reduceRight || function(t, e) {
            return n(this, t, e, this.length - 1, -1, -1)
        },
        reverse: ye.reverse,
        selector: null,
        shift: ye.shift,
        slice: function() {
            return new qt(this.context, this)
        },
        sort: ye.sort,
        splice: ye.splice,
        toArray: function() {
            return ye.slice.call(this)
        },
        to$: function() {
            return L(this)
        },
        toJQuery: function() {
            return L(this)
        },
        unique: function() {
            return new qt(this.context, se(this))
        },
        unshift: ye.unshift
    }), qt.extend = function(t, e, n) {
        if (n.length && e && (e instanceof qt || e.__dt_wrapper)) {
            var a, o, r, l = function(e, n, a) {
                return function() {
                    var t = n.apply(e, arguments);
                    return qt.extend(t, t, a.methodExt), t
                }
            };
            for (a = 0, o = n.length; a < o; a++) e[(r = n[a]).name] = "function" == typeof r.val ? l(t, r.val, r) : L.isPlainObject(r.val) ? {} : r.val, e[r.name].__dt_wrapper = !0, qt.extend(t, e[r.name], r.propExt)
        }
    }, qt.register = zt = function(t, e) {
        if (L.isArray(t))
            for (var n = 0, a = t.length; n < a; n++) qt.register(t[n], e);
        else {
            var o, r, l = t.split("."),
                i = ge;
            for (n = 0, a = l.length; n < a; n++) {
                var s;
                o = (r = -1 !== l[n].indexOf("()")) ? l[n].replace("()", "") : l[n];
                t: {
                    s = 0;
                    for (var u = i.length; s < u; s++)
                        if (i[s].name === o) {
                            s = i[s];
                            break t
                        }
                    s = null
                }
                s || (s = {
                    name: o,
                    val: {},
                    methodExt: [],
                    propExt: []
                }, i.push(s)), n === a - 1 ? s.val = e : i = r ? s.methodExt : s.propExt
            }
        }
    }, qt.registerPlural = Vt = function(t, e, n) {
        qt.register(t, n), qt.register(e, function() {
            var t = n.apply(this, arguments);
            return t === this ? this : t instanceof qt ? t.length ? L.isArray(t[0]) ? new qt(t.context, t[0]) : t[0] : R : t
        })
    }, zt("tables()", function(t) {
        var e;
        if (t) {
            e = qt;
            var n = this.context;
            if ("number" == typeof t) t = [n[t]];
            else {
                var a = L.map(n, function(t) {
                    return t.nTable
                });
                t = L(a).filter(t).map(function() {
                    var t = L.inArray(this, a);
                    return n[t]
                }).toArray()
            }
            e = new e(t)
        } else e = this;
        return e
    }), zt("table()", function(t) {
        var e = (t = this.tables(t)).context;
        return e.length ? new qt(e[0]) : t
    }), Vt("tables().nodes()", "table().node()", function() {
        return this.iterator("table", function(t) {
            return t.nTable
        }, 1)
    }), Vt("tables().body()", "table().body()", function() {
        return this.iterator("table", function(t) {
            return t.nTBody
        }, 1)
    }), Vt("tables().header()", "table().header()", function() {
        return this.iterator("table", function(t) {
            return t.nTHead
        }, 1)
    }), Vt("tables().footer()", "table().footer()", function() {
        return this.iterator("table", function(t) {
            return t.nTFoot
        }, 1)
    }), Vt("tables().containers()", "table().container()", function() {
        return this.iterator("table", function(t) {
            return t.nTableWrapper
        }, 1)
    }), zt("draw()", function(e) {
        return this.iterator("table", function(t) {
            "page" === e ? H(t) : ("string" == typeof e && (e = "full-hold" !== e), E(t, !1 === e))
        })
    }), zt("page()", function(e) {
        return e === R ? this.page.info().page : this.iterator("table", function(t) {
            ct(t, e)
        })
    }), zt("page.info()", function() {
        if (0 === this.context.length) return R;
        var t = this.context[0],
            e = t._iDisplayStart,
            n = t.oFeatures.bPaginate ? t._iDisplayLength : -1,
            a = t.fnRecordsDisplay(),
            o = -1 === n;
        return {
            page: o ? 0 : Math.floor(e / n),
            pages: o ? 1 : Math.ceil(a / n),
            start: e,
            end: t.fnDisplayEnd(),
            length: n,
            recordsTotal: t.fnRecordsTotal(),
            recordsDisplay: a,
            serverSide: "ssp" === Et(t)
        }
    }), zt("page.len()", function(e) {
        return e === R ? 0 !== this.context.length ? this.context[0]._iDisplayLength : R : this.iterator("table", function(t) {
            it(t, e)
        })
    });
    var ve = function(a, o, t) {
        if (t) {
            var e = new qt(a);
            e.one("draw", function() {
                t(e.ajax.json())
            })
        }
        if ("ssp" == Et(a)) E(a, o);
        else {
            ft(a, !0);
            var n = a.jqXHR;
            n && 4 !== n.readyState && n.abort(), q(a, [], function(t) {
                i(a);
                for (var e = 0, n = (t = $(a, t)).length; e < n; e++) A(a, t[e]);
                E(a, o), ft(a, !1)
            })
        }
    };
    zt("ajax.json()", function() {
        var t = this.context;
        if (0 < t.length) return t[0].json
    }), zt("ajax.params()", function() {
        var t = this.context;
        if (0 < t.length) return t[0].oAjaxData
    }), zt("ajax.reload()", function(e, n) {
        return this.iterator("table", function(t) {
            ve(t, !1 === n, e)
        })
    }), zt("ajax.url()", function(e) {
        var t = this.context;
        return e === R ? 0 === t.length ? R : (t = t[0]).ajax ? L.isPlainObject(t.ajax) ? t.ajax.url : t.ajax : t.sAjaxSource : this.iterator("table", function(t) {
            L.isPlainObject(t.ajax) ? t.ajax.url = e : t.ajax = e
        })
    }), zt("ajax.url().load()", function(e, n) {
        return this.iterator("table", function(t) {
            ve(t, !1 === n, e)
        })
    });
    var xe = function(t, e, n, a, o) {
            var r, l, i, s, u, c, d = [];
            for (i = typeof e, e && "string" !== i && "function" !== i && e.length !== R || (e = [e]), i = 0, s = e.length; i < s; i++)
                for (u = 0, c = (l = e[i] && e[i].split && !e[i].match(/[\[\(:]/) ? e[i].split(",") : [e[i]]).length; u < c; u++)(r = n("string" == typeof l[u] ? L.trim(l[u]) : l[u])) && r.length && (d = d.concat(r));
            if ((t = Ut.selector[t]).length)
                for (i = 0, s = t.length; i < s; i++) d = t[i](a, o, d);
            return se(d)
        },
        Se = function(t) {
            return t || (t = {}), t.filter && t.search === R && (t.search = t.filter), L.extend({
                search: "none",
                order: "current",
                page: "all"
            }, t)
        },
        Ie = function(t) {
            for (var e = 0, n = t.length; e < n; e++)
                if (0 < t[e].length) return t[0] = t[e], t[0].length = 1, t.length = 1, t.context = [t.context[e]], t;
            return t.length = 0, t
        },
        De = function(t, e) {
            var n, a, o, r = [],
                l = t.aiDisplay;
            n = t.aiDisplayMaster;
            var i = e.search;
            if (a = e.order, o = e.page, "ssp" == Et(t)) return "removed" === i ? [] : le(0, n.length);
            if ("current" == o)
                for (n = t._iDisplayStart, a = t.fnDisplayEnd(); n < a; n++) r.push(l[n]);
            else if ("current" == a || "applied" == a) r = "none" == i ? n.slice() : "applied" == i ? l.slice() : L.map(n, function(t) {
                return -1 === L.inArray(t, l) ? t : null
            });
            else if ("index" == a || "original" == a)
                for (n = 0, a = t.aoData.length; n < a; n++) "none" == i ? r.push(n) : (-1 === (o = L.inArray(n, l)) && "removed" == i || 0 <= o && "applied" == i) && r.push(n);
            return r
        };
    zt("rows()", function(t, e) {
        t === R ? t = "" : L.isPlainObject(t) && (e = t, t = "");
        e = Se(e);
        var n = this.iterator("table", function(a) {
            var o, r = e;
            return xe("row", t, function(n) {
                var t = te(n);
                if (null !== t && !r) return [t];
                if (o || (o = De(a, r)), null !== t && -1 !== L.inArray(t, o)) return [t];
                if (null === n || n === R || "" === n) return o;
                if ("function" == typeof n) return L.map(o, function(t) {
                    var e = a.aoData[t];
                    return n(t, e._aData, e.nTr) ? t : null
                });
                if (t = ie(re(a.aoData, o, "nTr")), n.nodeName) return n._DT_RowIndex !== R ? [n._DT_RowIndex] : n._DT_CellIndex ? [n._DT_CellIndex.row] : (t = L(n).closest("*[data-dt-row]")).length ? [t.data("dt-row")] : [];
                if ("string" == typeof n && "#" === n.charAt(0)) {
                    var e = a.aIds[n.replace(/^#/, "")];
                    if (e !== R) return [e.idx]
                }
                return L(t).filter(n).map(function() {
                    return this._DT_RowIndex
                }).toArray()
            }, a, r)
        }, 1);
        return n.selector.rows = t, n.selector.opts = e, n
    }), zt("rows().nodes()", function() {
        return this.iterator("row", function(t, e) {
            return t.aoData[e].nTr || R
        }, 1)
    }), zt("rows().data()", function() {
        return this.iterator(!0, "rows", function(t, e) {
            return re(t.aoData, e, "_aData")
        }, 1)
    }), Vt("rows().cache()", "row().cache()", function(a) {
        return this.iterator("row", function(t, e) {
            var n = t.aoData[e];
            return "search" === a ? n._aFilterData : n._aSortData
        }, 1)
    }), Vt("rows().invalidate()", "row().invalidate()", function(n) {
        return this.iterator("row", function(t, e) {
            o(t, e, n)
        })
    }), Vt("rows().indexes()", "row().index()", function() {
        return this.iterator("row", function(t, e) {
            return e
        }, 1)
    }), Vt("rows().ids()", "row().id()", function(t) {
        for (var e = [], n = this.context, a = 0, o = n.length; a < o; a++)
            for (var r = 0, l = this[a].length; r < l; r++) {
                var i = n[a].rowIdFn(n[a].aoData[this[a][r]]._aData);
                e.push((!0 === t ? "#" : "") + i)
            }
        return new qt(n, e)
    }), Vt("rows().remove()", "row().remove()", function() {
        var c = this;
        return this.iterator("row", function(t, e, n) {
            var a, o, r, l, i, s = t.aoData,
                u = s[e];
            for (s.splice(e, 1), a = 0, o = s.length; a < o; a++)
                if (i = (r = s[a]).anCells, null !== r.nTr && (r.nTr._DT_RowIndex = a), null !== i)
                    for (r = 0, l = i.length; r < l; r++) i[r]._DT_CellIndex.row = a;
            d(t.aiDisplayMaster, e), d(t.aiDisplay, e), d(c[n], e, !1), 0 < t._iRecordsDisplay && t._iRecordsDisplay--, Ot(t), (e = t.rowIdFn(u._aData)) !== R && delete t.aIds[e]
        }), this.iterator("table", function(t) {
            for (var e = 0, n = t.aoData.length; e < n; e++) t.aoData[e].idx = e
        }), this
    }), zt("rows.add()", function(r) {
        var t = this.iterator("table", function(t) {
                var e, n, a, o = [];
                for (n = 0, a = r.length; n < a; n++)(e = r[n]).nodeName && "TR" === e.nodeName.toUpperCase() ? o.push(k(t, e)[0]) : o.push(A(t, e));
                return o
            }, 1),
            e = this.rows(-1);
        return e.pop(), L.merge(e, t), e
    }), zt("row()", function(t, e) {
        return Ie(this.rows(t, e))
    }), zt("row().data()", function(t) {
        var e = this.context;
        return t === R ? e.length && this.length ? e[0].aoData[this[0]]._aData : R : (e[0].aoData[this[0]]._aData = t, o(e[0], this[0], "data"), this)
    }), zt("row().node()", function() {
        var t = this.context;
        return t.length && this.length && t[0].aoData[this[0]].nTr || null
    }), zt("row.add()", function(e) {
        e instanceof L && e.length && (e = e[0]);
        var t = this.iterator("table", function(t) {
            return e.nodeName && "TR" === e.nodeName.toUpperCase() ? k(t, e)[0] : A(t, e)
        });
        return this.row(t[0])
    });
    var we = function(t, e) {
            var n = t.context;
            n.length && (n = n[0].aoData[e !== R ? e : t[0]]) && n._details && (n._details.remove(), n._detailsShow = R, n._details = R)
        },
        _e = function(t, e) {
            var n = t.context;
            if (n.length && t.length) {
                var a = n[0].aoData[t[0]];
                if (a._details) {
                    (a._detailsShow = e) ? a._details.insertAfter(a.nTr): a._details.detach();
                    var l = n[0],
                        o = new qt(l),
                        i = l.aoData;
                    o.off("draw.dt.DT_details column-visibility.dt.DT_details destroy.dt.DT_details"), 0 < oe(i, "_details").length && (o.on("draw.dt.DT_details", function(t, e) {
                        l === e && o.rows({
                            page: "current"
                        }).eq(0).each(function(t) {
                            (t = i[t])._detailsShow && t._details.insertAfter(t.nTr)
                        })
                    }), o.on("column-visibility.dt.DT_details", function(t, e) {
                        if (l === e)
                            for (var n, a = v(e), o = 0, r = i.length; o < r; o++)(n = i[o])._details && n._details.children("td[colspan]").attr("colspan", a)
                    }), o.on("destroy.dt.DT_details", function(t, e) {
                        if (l === e)
                            for (var n = 0, a = i.length; n < a; n++) i[n]._details && we(o, n)
                    }))
                }
            }
        };
    zt("row().child()", function(t, e) {
        var n = this.context;
        if (t === R) return n.length && this.length ? n[0].aoData[this[0]]._details : R;
        if (!0 === t) this.child.show();
        else if (!1 === t) we(this);
        else if (n.length && this.length) {
            var o = n[0],
                r = (n = n[0].aoData[this[0]], []),
                l = function(t, e) {
                    if (L.isArray(t) || t instanceof L)
                        for (var n = 0, a = t.length; n < a; n++) l(t[n], e);
                    else t.nodeName && "tr" === t.nodeName.toLowerCase() ? r.push(t) : (n = L("<tr><td/></tr>").addClass(e), L("td", n).addClass(e).html(t)[0].colSpan = v(o), r.push(n[0]))
                };
            l(t, e), n._details && n._details.detach(), n._details = L(r), n._detailsShow && n._details.insertAfter(n.nTr)
        }
        return this
    }), zt(["row().child.show()", "row().child().show()"], function() {
        return _e(this, !0), this
    }), zt(["row().child.hide()", "row().child().hide()"], function() {
        return _e(this, !1), this
    }), zt(["row().child.remove()", "row().child().remove()"], function() {
        return we(this), this
    }), zt("row().child.isShown()", function() {
        var t = this.context;
        return t.length && this.length && t[0].aoData[this[0]]._detailsShow || !1
    });
    var Te = /^([^:]+):(name|visIdx|visible)$/,
        Ce = function(t, e, n, a, o) {
            n = [], a = 0;
            for (var r = o.length; a < r; a++) n.push(B(t, o[a], e));
            return n
        };
    zt("columns()", function(e, n) {
        e === R ? e = "" : L.isPlainObject(e) && (n = e, e = "");
        n = Se(n);
        var t = this.iterator("table", function(r) {
            var t = e,
                l = n,
                i = r.aoColumns,
                s = oe(i, "sName"),
                u = oe(i, "nTh");
            return xe("column", t, function(n) {
                var t = te(n);
                if ("" === n) return le(i.length);
                if (null !== t) return [0 <= t ? t : i.length + t];
                if ("function" == typeof n) {
                    var a = De(r, l);
                    return L.map(i, function(t, e) {
                        return n(e, Ce(r, e, 0, 0, a), u[e]) ? e : null
                    })
                }
                var o = "string" == typeof n ? n.match(Te) : "";
                if (o) switch (o[2]) {
                    case "visIdx":
                    case "visible":
                        if ((t = parseInt(o[1], 10)) < 0) {
                            var e = L.map(i, function(t, e) {
                                return t.bVisible ? e : null
                            });
                            return [e[e.length + t]]
                        }
                        return [N(r, t)];
                    case "name":
                        return L.map(s, function(t, e) {
                            return t === o[1] ? e : null
                        });
                    default:
                        return []
                }
                return n.nodeName && n._DT_CellIndex ? [n._DT_CellIndex.column] : (t = L(u).filter(n).map(function() {
                    return L.inArray(this, u)
                }).toArray()).length || !n.nodeName ? t : (t = L(n).closest("*[data-dt-column]")).length ? [t.data("dt-column")] : []
            }, r, l)
        }, 1);
        return t.selector.cols = e, t.selector.opts = n, t
    }), Vt("columns().header()", "column().header()", function() {
        return this.iterator("column", function(t, e) {
            return t.aoColumns[e].nTh
        }, 1)
    }), Vt("columns().footer()", "column().footer()", function() {
        return this.iterator("column", function(t, e) {
            return t.aoColumns[e].nTf
        }, 1)
    }), Vt("columns().data()", "column().data()", function() {
        return this.iterator("column-rows", Ce, 1)
    }), Vt("columns().dataSrc()", "column().dataSrc()", function() {
        return this.iterator("column", function(t, e) {
            return t.aoColumns[e].mData
        }, 1)
    }), Vt("columns().cache()", "column().cache()", function(r) {
        return this.iterator("column-rows", function(t, e, n, a, o) {
            return re(t.aoData, o, "search" === r ? "_aFilterData" : "_aSortData", e)
        }, 1)
    }), Vt("columns().nodes()", "column().nodes()", function() {
        return this.iterator("column-rows", function(t, e, n, a, o) {
            return re(t.aoData, o, "anCells", e)
        }, 1)
    }), Vt("columns().visible()", "column().visible()", function(u, n) {
        var t = this.iterator("column", function(t, e) {
            if (u === R) return t.aoColumns[e].bVisible;
            var n, a, o, r = t.aoColumns,
                l = r[e],
                i = t.aoData;
            if (u !== R && l.bVisible !== u) {
                if (u) {
                    var s = L.inArray(!0, oe(r, "bVisible"), e + 1);
                    for (n = 0, a = i.length; n < a; n++) o = i[n].nTr, r = i[n].anCells, o && o.insertBefore(r[e], r[s] || null)
                } else L(oe(t.aoData, "anCells", e)).detach();
                l.bVisible = u, O(t, t.aoHeader), O(t, t.aoFooter), Ft(t)
            }
        });
        return u !== R && (this.iterator("column", function(t, e) {
            jt(t, null, "column-visibility", [t, e, u, n])
        }), (n === R || n) && this.columns.adjust()), t
    }), Vt("columns().indexes()", "column().index()", function(n) {
        return this.iterator("column", function(t, e) {
            return "visible" === n ? u(t, e) : e
        }, 1)
    }), zt("columns.adjust()", function() {
        return this.iterator("table", function(t) {
            P(t)
        }, 1)
    }), zt("column.index()", function(t, e) {
        if (0 !== this.context.length) {
            var n = this.context[0];
            if ("fromVisible" === t || "toData" === t) return N(n, e);
            if ("fromData" === t || "toVisible" === t) return u(n, e)
        }
    }), zt("column()", function(t, e) {
        return Ie(this.columns(t, e))
    }), zt("cells()", function(m, t, b) {
        if (L.isPlainObject(m) && (m.row === R ? (b = m, m = null) : (b = t, t = null)), L.isPlainObject(t) && (b = t, t = null), null === t || t === R) return this.iterator("table", function(n) {
            var a, o, r, l, i, s, u, t = m,
                e = Se(b),
                c = n.aoData,
                d = De(n, e),
                f = ie(re(c, d, "anCells")),
                p = L([].concat.apply([], f)),
                h = n.aoColumns.length;
            return xe("cell", t, function(t) {
                var e = "function" == typeof t;
                if (null === t || t === R || e) {
                    for (o = [], r = 0, l = d.length; r < l; r++)
                        for (a = d[r], i = 0; i < h; i++) s = {
                            row: a,
                            column: i
                        }, e ? (u = c[a], t(s, B(n, a, i), u.anCells ? u.anCells[i] : null) && o.push(s)) : o.push(s);
                    return o
                }
                return L.isPlainObject(t) ? [t] : (e = p.filter(t).map(function(t, e) {
                    return {
                        row: e._DT_CellIndex.row,
                        column: e._DT_CellIndex.column
                    }
                }).toArray()).length || !t.nodeName ? e : (u = L(t).closest("*[data-dt-row]")).length ? [{
                    row: u.data("dt-row"),
                    column: u.data("dt-column")
                }] : []
            }, n, e)
        });
        var n, a, o, r, l, i = this.columns(t, b),
            s = this.rows(m, b),
            e = this.iterator("table", function(t, e) {
                for (n = [], a = 0, o = s[e].length; a < o; a++)
                    for (r = 0, l = i[e].length; r < l; r++) n.push({
                        row: s[e][a],
                        column: i[e][r]
                    });
                return n
            }, 1);
        return L.extend(e.selector, {
            cols: t,
            rows: m,
            opts: b
        }), e
    }), Vt("cells().nodes()", "cell().node()", function() {
        return this.iterator("cell", function(t, e, n) {
            return (t = t.aoData[e]) && t.anCells ? t.anCells[n] : R
        }, 1)
    }), zt("cells().data()", function() {
        return this.iterator("cell", function(t, e, n) {
            return B(t, e, n)
        }, 1)
    }), Vt("cells().cache()", "cell().cache()", function(a) {
        return a = "search" === a ? "_aFilterData" : "_aSortData", this.iterator("cell", function(t, e, n) {
            return t.aoData[e][a][n]
        }, 1)
    }), Vt("cells().render()", "cell().render()", function(a) {
        return this.iterator("cell", function(t, e, n) {
            return B(t, e, n, a)
        }, 1)
    }), Vt("cells().indexes()", "cell().index()", function() {
        return this.iterator("cell", function(t, e, n) {
            return {
                row: e,
                column: n,
                columnVisible: u(t, n)
            }
        }, 1)
    }), Vt("cells().invalidate()", "cell().invalidate()", function(a) {
        return this.iterator("cell", function(t, e, n) {
            o(t, e, a, n)
        })
    }), zt("cell()", function(t, e, n) {
        return Ie(this.cells(t, e, n))
    }), zt("cell().data()", function(t) {
        var e = this.context,
            n = this[0];
        return t === R ? e.length && n.length ? B(e[0], n[0].row, n[0].column) : R : (a(e[0], n[0].row, n[0].column, t), o(e[0], n[0].row, "data", n[0].column), this)
    }), zt("order()", function(e, t) {
        var n = this.context;
        return e === R ? 0 !== n.length ? n[0].aaSorting : R : ("number" == typeof e ? e = [
            [e, t]
        ] : e.length && !L.isArray(e[0]) && (e = Array.prototype.slice.call(arguments)), this.iterator("table", function(t) {
            t.aaSorting = e.slice()
        }))
    }), zt("order.listener()", function(e, n, a) {
        return this.iterator("table", function(t) {
            _t(t, e, n, a)
        })
    }), zt("order.fixed()", function(e) {
        if (e) return this.iterator("table", function(t) {
            t.aaSortingFixed = L.extend(!0, {}, e)
        });
        var t = (t = this.context).length ? t[0].aaSortingFixed : R;
        return L.isArray(t) ? {
            pre: t
        } : t
    }), zt(["columns().order()", "column().order()"], function(a) {
        var o = this;
        return this.iterator("table", function(t, e) {
            var n = [];
            L.each(o[e], function(t, e) {
                n.push([e, a])
            }), t.aaSorting = n
        })
    }), zt("search()", function(e, n, a, o) {
        var t = this.context;
        return e === R ? 0 !== t.length ? t[0].oPreviousSearch.sSearch : R : this.iterator("table", function(t) {
            t.oFeatures.bFilter && J(t, L.extend({}, t.oPreviousSearch, {
                sSearch: e + "",
                bRegex: null !== n && n,
                bSmart: null === a || a,
                bCaseInsensitive: null === o || o
            }), 1)
        })
    }), Vt("columns().search()", "column().search()", function(a, o, r, l) {
        return this.iterator("column", function(t, e) {
            var n = t.aoPreSearchCols;
            if (a === R) return n[e].sSearch;
            t.oFeatures.bFilter && (L.extend(n[e], {
                sSearch: a + "",
                bRegex: null !== o && o,
                bSmart: null === r || r,
                bCaseInsensitive: null === l || l
            }), J(t, t.oPreviousSearch, 1))
        })
    }), zt("state()", function() {
        return this.context.length ? this.context[0].oSavedState : null
    }), zt("state.clear()", function() {
        return this.iterator("table", function(t) {
            t.fnStateSaveCallback.call(t.oInstance, t, {})
        })
    }), zt("state.loaded()", function() {
        return this.context.length ? this.context[0].oLoadedState : null
    }), zt("state.save()", function() {
        return this.iterator("table", function(t) {
            Ft(t)
        })
    }), $t.versionCheck = $t.fnVersionCheck = function(t) {
        for (var e, n, a = $t.version.split("."), o = 0, r = (t = t.split(".")).length; o < r; o++)
            if ((e = parseInt(a[o], 10) || 0) !== (n = parseInt(t[o], 10) || 0)) return n < e;
        return !0
    }, $t.isDataTable = $t.fnIsDataTable = function(t) {
        var o = L(t).get(0),
            r = !1;
        return t instanceof $t.Api || (L.each($t.settings, function(t, e) {
            var n = e.nScrollHead ? L("table", e.nScrollHead)[0] : null,
                a = e.nScrollFoot ? L("table", e.nScrollFoot)[0] : null;
            e.nTable !== o && n !== o && a !== o || (r = !0)
        }), r)
    }, $t.tables = $t.fnTables = function(e) {
        var t = !1;
        L.isPlainObject(e) && (t = e.api, e = e.visible);
        var n = L.map($t.settings, function(t) {
            if (!e || e && L(t.nTable).is(":visible")) return t.nTable
        });
        return t ? new qt(n) : n
    }, $t.camelToHungarian = x, zt("$()", function(t, e) {
        var n = this.rows(e).nodes();
        n = L(n);
        return L([].concat(n.filter(t).toArray(), n.find(t).toArray()))
    }), L.each(["on", "one", "off"], function(t, n) {
        zt(n + "()", function() {
            var t = Array.prototype.slice.call(arguments);
            t[0] = L.map(t[0].split(/\s/), function(t) {
                return t.match(/\.dt\b/) ? t : t + ".dt"
            }).join(" ");
            var e = L(this.tables().nodes());
            return e[n].apply(e, t), this
        })
    }), zt("clear()", function() {
        return this.iterator("table", function(t) {
            i(t)
        })
    }), zt("settings()", function() {
        return new qt(this.context, this.context)
    }), zt("init()", function() {
        var t = this.context;
        return t.length ? t[0].oInit : null
    }), zt("data()", function() {
        return this.iterator("table", function(t) {
            return oe(t.aoData, "_aData")
        }).flatten()
    }), zt("destroy()", function(d) {
        return d = d || !1, this.iterator("table", function(e) {
            var n, t = e.nTableWrapper.parentNode,
                a = e.oClasses,
                o = e.nTable,
                r = e.nTBody,
                l = e.nTHead,
                i = e.nTFoot,
                s = L(o),
                u = (r = L(r), L(e.nTableWrapper)),
                c = L.map(e.aoData, function(t) {
                    return t.nTr
                });
            e.bDestroying = !0, jt(e, "aoDestroyCallback", "destroy", [e]), d || new qt(e).columns().visible(!0), u.off(".DT").find(":not(tbody *)").off(".DT"), L(g).off(".DT-" + e.sInstance), o != l.parentNode && (s.children("thead").detach(), s.append(l)), i && o != i.parentNode && (s.children("tfoot").detach(), s.append(i)), e.aaSorting = [], e.aaSortingFixed = [], Tt(e), L(c).removeClass(e.asStripeClasses.join(" ")), L("th, td", l).removeClass(a.sSortable + " " + a.sSortableAsc + " " + a.sSortableDesc + " " + a.sSortableNone), r.children().detach(), r.append(c), s[l = d ? "remove" : "detach"](), u[l](), !d && t && (t.insertBefore(o, e.nTableReinsertBefore), s.css("width", e.sDestroyWidth).removeClass(a.sTable), (n = e.asDestroyStripes.length) && r.children().each(function(t) {
                L(this).addClass(e.asDestroyStripes[t % n])
            })), -1 !== (t = L.inArray(e, $t.settings)) && $t.settings.splice(t, 1)
        })
    }), L.each(["column", "row", "cell"], function(t, s) {
        zt(s + "s().every()", function(r) {
            var l = this.selector.opts,
                i = this;
            return this.iterator(s, function(t, e, n, a, o) {
                r.call(i[s](e, "cell" === s ? n : l, "cell" === s ? l : R), e, n, a, o)
            })
        })
    }), zt("i18n()", function(t, e, n) {
        var a = this.context[0];
        return (t = j(t)(a.oLanguage)) === R && (t = e), n !== R && L.isPlainObject(t) && (t = t[n] !== R ? t[n] : t._), t.replace("%d", n)
    }), $t.version = "1.10.16", $t.settings = [], $t.models = {}, $t.models.oSearch = {
        bCaseInsensitive: !0,
        sSearch: "",
        bRegex: !1,
        bSmart: !0
    }, $t.models.oRow = {
        nTr: null,
        anCells: null,
        _aData: [],
        _aSortData: null,
        _aFilterData: null,
        _sFilterRow: null,
        _sRowStripe: "",
        src: null,
        idx: -1
    }, $t.models.oColumn = {
        idx: null,
        aDataSort: null,
        asSorting: null,
        bSearchable: null,
        bSortable: null,
        bVisible: null,
        _sManualType: null,
        _bAttrSrc: !1,
        fnCreatedCell: null,
        fnGetData: null,
        fnSetData: null,
        mData: null,
        mRender: null,
        nTh: null,
        nTf: null,
        sClass: null,
        sContentPadding: null,
        sDefaultContent: null,
        sName: null,
        sSortDataType: "std",
        sSortingClass: null,
        sSortingClassJUI: null,
        sTitle: null,
        sType: null,
        sWidth: null,
        sWidthOrig: null
    }, $t.defaults = {
        aaData: null,
        aaSorting: [
            [0, "asc"]
        ],
        aaSortingFixed: [],
        ajax: null,
        aLengthMenu: [10, 25, 50, 100],
        aoColumns: null,
        aoColumnDefs: null,
        aoSearchCols: [],
        asStripeClasses: null,
        bAutoWidth: !0,
        bDeferRender: !1,
        bDestroy: !1,
        bFilter: !0,
        bInfo: !0,
        bLengthChange: !0,
        bPaginate: !0,
        bProcessing: !1,
        bRetrieve: !1,
        bScrollCollapse: !1,
        bServerSide: !1,
        bSort: !0,
        bSortMulti: !0,
        bSortCellsTop: !1,
        bSortClasses: !0,
        bStateSave: !1,
        fnCreatedRow: null,
        fnDrawCallback: null,
        fnFooterCallback: null,
        fnFormatNumber: function(t) {
            return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, this.oLanguage.sThousands)
        },
        fnHeaderCallback: null,
        fnInfoCallback: null,
        fnInitComplete: null,
        fnPreDrawCallback: null,
        fnRowCallback: null,
        fnServerData: null,
        fnServerParams: null,
        fnStateLoadCallback: function(t) {
            try {
                return JSON.parse((-1 === t.iStateDuration ? sessionStorage : localStorage).getItem("DataTables_" + t.sInstance + "_" + location.pathname))
            } catch (t) {}
        },
        fnStateLoadParams: null,
        fnStateLoaded: null,
        fnStateSaveCallback: function(t, e) {
            try {
                (-1 === t.iStateDuration ? sessionStorage : localStorage).setItem("DataTables_" + t.sInstance + "_" + location.pathname, JSON.stringify(e))
            } catch (t) {}
        },
        fnStateSaveParams: null,
        iStateDuration: 7200,
        iDeferLoading: null,
        iDisplayLength: 10,
        iDisplayStart: 0,
        iTabIndex: 0,
        oClasses: {},
        oLanguage: {
            oAria: {
                sSortAscending: ": activate to sort column ascending",
                sSortDescending: ": activate to sort column descending"
            },
            // oPaginate: {
            //     sFirst: "Primero",
            //     sLast: "Ultimo",
            //     sNext: "Siguiente",
            //     sPrevious: "Anterior"
            // },
            // sEmptyTable: "La Información no esta disponible en la tabla",
            // sInfo: "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
            // sInfoEmpty: "Mostrando 0 a 0 de 0 Entradas",
            // sInfoFiltered: "(filtered from _MAX_ total entries)",
            // sInfoPostFix: "",
            // sDecimal: "",
            // sThousands: ",",
            sLengthMenu: '',
            // sLoadingRecords: "Cargando...",
            // sProcessing: "Procesando...",
            sSearch: "",
            sSearchPlaceholder: "  Buscar enfermedad",
            // sUrl: "",
            // sZeroRecords: "No se encuentrar los registros"
        },
        oSearch: L.extend({}, $t.models.oSearch),
        sAjaxDataProp: "data",
        sAjaxSource: null,
        sDom: "lfrtip",
        searchDelay: null,
        sPaginationType: "simple_numbers",
        sScrollX: "",
        sScrollXInner: "",
        sScrollY: "",
        sServerMethod: "GET",
        renderer: null,
        rowId: "DT_RowId"
    }, r($t.defaults), $t.defaults.column = {
        aDataSort: null,
        iDataSort: -1,
        asSorting: ["asc", "desc"],
        bSearchable: !0,
        bSortable: !0,
        bVisible: !0,
        fnCreatedCell: null,
        mData: null,
        mRender: null,
        sCellType: "td",
        sClass: "",
        sContentPadding: "",
        sDefaultContent: null,
        sName: "",
        sSortDataType: "std",
        sTitle: null,
        sType: null,
        sWidth: null
    }, r($t.defaults.column), $t.models.oSettings = {
        oFeatures: {
            bAutoWidth: null,
            bDeferRender: null,
            bFilter: null,
            bInfo: null,
            bLengthChange: null,
            bPaginate: null,
            bProcessing: null,
            bServerSide: null,
            bSort: null,
            bSortMulti: null,
            bSortClasses: null,
            bStateSave: null
        },
        oScroll: {
            bCollapse: null,
            iBarWidth: 0,
            sX: null,
            sXInner: null,
            sY: null
        },
        oLanguage: {
            fnInfoCallback: null
        },
        oBrowser: {
            bScrollOversize: !1,
            bScrollbarLeft: !1,
            bBounding: !1,
            barWidth: 0
        },
        ajax: null,
        aanFeatures: [],
        aoData: [],
        aiDisplay: [],
        aiDisplayMaster: [],
        aIds: {},
        aoColumns: [],
        aoHeader: [],
        aoFooter: [],
        oPreviousSearch: {},
        aoPreSearchCols: [],
        aaSorting: null,
        aaSortingFixed: [],
        asStripeClasses: null,
        asDestroyStripes: [],
        sDestroyWidth: 0,
        aoRowCallback: [],
        aoHeaderCallback: [],
        aoFooterCallback: [],
        aoDrawCallback: [],
        aoRowCreatedCallback: [],
        aoPreDrawCallback: [],
        aoInitComplete: [],
        aoStateSaveParams: [],
        aoStateLoadParams: [],
        aoStateLoaded: [],
        sTableId: "",
        nTable: null,
        nTHead: null,
        nTFoot: null,
        nTBody: null,
        nTableWrapper: null,
        bDeferLoading: !1,
        bInitialised: !1,
        aoOpenRows: [],
        sDom: null,
        searchDelay: null,
        sPaginationType: "two_button",
        iStateDuration: 0,
        aoStateSave: [],
        aoStateLoad: [],
        oSavedState: null,
        oLoadedState: null,
        sAjaxSource: null,
        sAjaxDataProp: null,
        bAjaxDataGet: !0,
        jqXHR: null,
        json: R,
        oAjaxData: R,
        fnServerData: null,
        aoServerParams: [],
        sServerMethod: null,
        fnFormatNumber: null,
        aLengthMenu: null,
        iDraw: 0,
        bDrawing: !1,
        iDrawError: -1,
        _iDisplayLength: 10,
        _iDisplayStart: 0,
        _iRecordsTotal: 0,
        _iRecordsDisplay: 0,
        oClasses: {},
        bFiltered: !1,
        bSorted: !1,
        bSortCellsTop: null,
        oInit: null,
        aoDestroyCallback: [],
        fnRecordsTotal: function() {
            return "ssp" == Et(this) ? 1 * this._iRecordsTotal : this.aiDisplayMaster.length
        },
        fnRecordsDisplay: function() {
            return "ssp" == Et(this) ? 1 * this._iRecordsDisplay : this.aiDisplay.length
        },
        fnDisplayEnd: function() {
            var t = this._iDisplayLength,
                e = this._iDisplayStart,
                n = e + t,
                a = this.aiDisplay.length,
                o = this.oFeatures,
                r = o.bPaginate;
            return o.bServerSide ? !1 === r || -1 === t ? e + a : Math.min(e + t, this._iRecordsDisplay) : !r || a < n || -1 === t ? a : n
        },
        oInstance: null,
        sInstance: null,
        iTabIndex: 0,
        nScrollHead: null,
        nScrollFoot: null,
        aLastSort: [],
        oPlugins: {},
        rowIdFn: null,
        rowId: null
    }, $t.ext = Ut = {
        buttons: {},
        classes: {},
        builder: "-source-",
        errMode: "alert",
        feature: [],
        search: [],
        selector: {
            cell: [],
            column: [],
            row: []
        },
        internal: {},
        legacy: {
            ajax: null
        },
        pager: {},
        renderer: {
            pageButton: {},
            header: {}
        },
        order: {},
        type: {
            detect: [],
            search: {},
            order: {}
        },
        _unique: 0,
        fnVersionCheck: $t.fnVersionCheck,
        iApiIndex: 0,
        oJUIClasses: {},
        sVersion: $t.version
    }, L.extend(Ut, {
        afnFiltering: Ut.search,
        aTypes: Ut.type.detect,
        ofnSearch: Ut.type.search,
        oSort: Ut.type.order,
        afnSortData: Ut.order,
        aoFeatures: Ut.feature,
        oApi: Ut.internal,
        oStdClasses: Ut.classes,
        oPagination: Ut.pager
    }), L.extend($t.ext.classes, {
        sTable: "dataTable",
        sNoFooter: "no-footer",
        sPageButton: "paginate_button",
        sPageButtonActive: "current",
        sPageButtonDisabled: "disabled",
        sStripeOdd: "odd",
        sStripeEven: "even",
        sRowEmpty: "dataTables_empty",
        sWrapper: "dataTables_wrapper",
        sFilter: "dataTables_filter",
        sInfo: "dataTables_info",
        sPaging: "dataTables_paginate paging_",
        sLength: "dataTables_length",
        sProcessing: "dataTables_processing",
        sSortAsc: "sorting_asc",
        sSortDesc: "sorting_desc",
        sSortable: "sorting",
        sSortableAsc: "sorting_asc_disabled",
        sSortableDesc: "sorting_desc_disabled",
        sSortableNone: "sorting_disabled",
        sSortColumn: "sorting_",
        sFilterInput: "",
        sLengthSelect: "",
        sScrollWrapper: "dataTables_scroll",
        sScrollHead: "dataTables_scrollHead",
        sScrollHeadInner: "dataTables_scrollHeadInner",
        sScrollBody: "dataTables_scrollBody",
        sScrollFoot: "dataTables_scrollFoot",
        sScrollFootInner: "dataTables_scrollFootInner",
        sHeaderTH: "",
        sFooterTH: "",
        sSortJUIAsc: "",
        sSortJUIDesc: "",
        sSortJUI: "",
        sSortJUIAscAllowed: "",
        sSortJUIDescAllowed: "",
        sSortJUIWrapper: "",
        sSortIcon: "",
        sJUIHeader: "",
        sJUIFooter: ""
    });
    var Fe = $t.ext.pager;
    L.extend(Fe, {
        simple: function() {
            return ["previous", "next"]
        },
        full: function() {
            return ["first", "previous", "next", "last"]
        },
        numbers: function(t, e) {
            return [Mt(t, e)]
        },
        simple_numbers: function(t, e) {
            return ["previous", Mt(t, e), "next"]
        },
        full_numbers: function(t, e) {
            return ["first", "previous", Mt(t, e), "next", "last"]
        },
        first_last_numbers: function(t, e) {
            return ["first", Mt(t, e), "last"]
        },
        _numbers: Mt,
        numbers_length: 7
    }), L.extend(!0, $t.ext.renderer, {
        pageButton: {
            _: function(i, t, s, e, u, c) {
                var d, f, n, p = i.oClasses,
                    h = i.oLanguage.oPaginate,
                    m = i.oLanguage.oAria.paginate || {},
                    b = 0,
                    g = function(t, e) {
                        var n, a, o, r, l = function(t) {
                            ct(i, t.data.action, !0)
                        };
                        for (n = 0, a = e.length; n < a; n++)
                            if (r = e[n], L.isArray(r)) o = L("<" + (r.DT_el || "div") + "/>").appendTo(t), g(o, r);
                            else {
                                switch (d = null, f = "", r) {
                                    case "ellipsis":
                                        t.append('<span class="ellipsis">&#x2026;</span>');
                                        break;
                                    case "first":
                                        d = h.sFirst, f = r + (0 < u ? "" : " " + p.sPageButtonDisabled);
                                        break;
                                    case "previous":
                                        d = h.sPrevious, f = r + (0 < u ? "" : " " + p.sPageButtonDisabled);
                                        break;
                                    case "next":
                                        d = h.sNext, f = r + (u < c - 1 ? "" : " " + p.sPageButtonDisabled);
                                        break;
                                    case "last":
                                        d = h.sLast, f = r + (u < c - 1 ? "" : " " + p.sPageButtonDisabled);
                                        break;
                                    default:
                                        d = r + 1, f = u === r ? p.sPageButtonActive : ""
                                }
                                null !== d && (Pt(o = L("<a>", {
                                    class: p.sPageButton + " " + f,
                                    "aria-controls": i.sTableId,
                                    "aria-label": m[r],
                                    "data-dt-idx": b,
                                    tabindex: i.iTabIndex,
                                    id: 0 === s && "string" == typeof r ? i.sTableId + "_" + r : null
                                }).html(d).appendTo(t), {
                                    action: r
                                }, l), b++)
                            }
                    };
                try {
                    n = L(t).find(y.activeElement).data("dt-idx")
                } catch (t) {}
                g(L(t).empty(), e), n !== R && L(t).find("[data-dt-idx=" + n + "]").focus()
            }
        }
    }), L.extend($t.ext.type.detect, [function(t, e) {
        var n = e.oLanguage.sDecimal;
        return ne(t, n) ? "num" + n : null
    }, function(t) {
        if (t && !(t instanceof Date) && !Kt.test(t)) return null;
        var e = Date.parse(t);
        return null !== e && !isNaN(e) || Qt(t) ? "date" : null
    }, function(t, e) {
        var n = e.oLanguage.sDecimal;
        return ne(t, n, !0) ? "num-fmt" + n : null
    }, function(t, e) {
        var n = e.oLanguage.sDecimal;
        return ae(t, n) ? "html-num" + n : null
    }, function(t, e) {
        var n = e.oLanguage.sDecimal;
        return ae(t, n, !0) ? "html-num-fmt" + n : null
    }, function(t) {
        return Qt(t) || "string" == typeof t && -1 !== t.indexOf("<") ? "html" : null
    }]), L.extend($t.ext.type.search, {
        html: function(t) {
            return Qt(t) ? t : "string" == typeof t ? t.replace(Jt, " ").replace(Gt, "") : ""
        },
        string: function(t) {
            return Qt(t) ? t : "string" == typeof t ? t.replace(Jt, " ") : t
        }
    });
    var Ae = function(t, e, n, a) {
        return 0 === t || t && "-" !== t ? (e && (t = ee(t, e)), t.replace && (n && (t = t.replace(n, "")), a && (t = t.replace(a, ""))), 1 * t) : -1 / 0
    };
    L.extend(Ut.type.order, {
        "date-pre": function(t) {
            return Date.parse(t) || -1 / 0
        },
        "html-pre": function(t) {
            return Qt(t) ? "" : t.replace ? t.replace(/<.*?>/g, "").toLowerCase() : t + ""
        },
        "string-pre": function(t) {
            return Qt(t) ? "" : "string" == typeof t ? t.toLowerCase() : t.toString ? t.toString() : ""
        },
        "string-asc": function(t, e) {
            return t < e ? -1 : e < t ? 1 : 0
        },
        "string-desc": function(t, e) {
            return t < e ? 1 : e < t ? -1 : 0
        }
    }), Wt(""), L.extend(!0, $t.ext.renderer, {
        header: {
            _: function(o, r, l, i) {
                L(o.nTable).on("order.dt.DT", function(t, e, n, a) {
                    o === e && (t = l.idx, r.removeClass(l.sSortingClass + " " + i.sSortAsc + " " + i.sSortDesc).addClass("asc" == a[t] ? i.sSortAsc : "desc" == a[t] ? i.sSortDesc : l.sSortingClass))
                })
            },
            jqueryui: function(o, r, l, i) {
                L("<div/>").addClass(i.sSortJUIWrapper).append(r.contents()).append(L("<span/>").addClass(i.sSortIcon + " " + l.sSortingClassJUI)).appendTo(r), L(o.nTable).on("order.dt.DT", function(t, e, n, a) {
                    o === e && (t = l.idx, r.removeClass(i.sSortAsc + " " + i.sSortDesc).addClass("asc" == a[t] ? i.sSortAsc : "desc" == a[t] ? i.sSortDesc : l.sSortingClass), r.find("span." + i.sSortIcon).removeClass(i.sSortJUIAsc + " " + i.sSortJUIDesc + " " + i.sSortJUI + " " + i.sSortJUIAscAllowed + " " + i.sSortJUIDescAllowed).addClass("asc" == a[t] ? i.sSortJUIAsc : "desc" == a[t] ? i.sSortJUIDesc : l.sSortingClassJUI))
                })
            }
        }
    });
    var ke = function(t) {
        return "string" == typeof t ? t.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;") : t
    };
    return $t.render = {
        number: function(a, o, r, l, i) {
            return {
                display: function(t) {
                    if ("number" != typeof t && "string" != typeof t) return t;
                    var e = t < 0 ? "-" : "",
                        n = parseFloat(t);
                    return isNaN(n) ? ke(t) : (n = n.toFixed(r), t = Math.abs(n), n = parseInt(t, 10), t = r ? o + (t - n).toFixed(r).substring(2) : "", e + (l || "") + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, a) + t + (i || ""))
                }
            }
        },
        text: function() {
            return {
                display: ke
            }
        }
    }, L.extend($t.ext.internal, {
        _fnExternApiFunc: e,
        _fnBuildAjax: q,
        _fnAjaxUpdate: z,
        _fnAjaxParameters: t,
        _fnAjaxUpdateDraw: V,
        _fnAjaxDataSrc: $,
        _fnAddColumn: _,
        _fnColumnOptions: T,
        _fnAdjustColumnSizing: P,
        _fnVisibleToColumnIndex: N,
        _fnColumnIndexToVisible: u,
        _fnVisbleColumns: v,
        _fnGetColumns: C,
        _fnColumnTypes: l,
        _fnApplyColumnDefs: F,
        _fnHungarianMap: r,
        _fnCamelToHungarian: x,
        _fnLanguageCompat: S,
        _fnBrowserDetect: w,
        _fnAddData: A,
        _fnAddTr: k,
        _fnNodeToDataIndex: function(t, e) {
            return e._DT_RowIndex !== R ? e._DT_RowIndex : null
        },
        _fnNodeToColumnIndex: function(t, e, n) {
            return L.inArray(n, t.aoData[e].anCells)
        },
        _fnGetCellData: B,
        _fnSetCellData: a,
        _fnSplitObjNotation: c,
        _fnGetObjectDataFn: j,
        _fnSetObjectDataFn: h,
        _fnGetDataMaster: p,
        _fnClearTable: i,
        _fnDeleteIndex: d,
        _fnInvalidate: o,
        _fnGetRowElements: s,
        _fnCreateTr: m,
        _fnBuildHead: b,
        _fnDrawHead: O,
        _fnDraw: H,
        _fnReDraw: E,
        _fnAddOptionsHtml: M,
        _fnDetectHeader: W,
        _fnGetUniqueThs: U,
        _fnFeatureHtmlFilter: X,
        _fnFilterComplete: J,
        _fnFilterCustom: G,
        _fnFilterColumn: K,
        _fnFilter: Y,
        _fnFilterCreateSearch: Z,
        _fnEscapeRegex: fe,
        _fnFilterData: Q,
        _fnFeatureHtmlInfo: nt,
        _fnUpdateInfo: at,
        _fnInfoMacros: ot,
        _fnInitialise: rt,
        _fnInitComplete: lt,
        _fnLengthChange: it,
        _fnFeatureHtmlLength: st,
        _fnFeatureHtmlPaginate: ut,
        _fnPageChange: ct,
        _fnFeatureHtmlProcessing: dt,
        _fnProcessingDisplay: ft,
        _fnFeatureHtmlTable: pt,
        _fnScrollDraw: ht,
        _fnApplyToChildren: mt,
        _fnCalculateColumnWidths: bt,
        _fnThrottle: be,
        _fnConvertToWidth: gt,
        _fnGetWidestNode: yt,
        _fnGetMaxLenString: vt,
        _fnStringToCss: xt,
        _fnSortFlatten: St,
        _fnSort: It,
        _fnSortAria: Dt,
        _fnSortListener: wt,
        _fnSortAttachListener: _t,
        _fnSortingClasses: Tt,
        _fnSortData: Ct,
        _fnSaveState: Ft,
        _fnLoadState: At,
        _fnSettingsFromNode: kt,
        _fnLog: Bt,
        _fnMap: Lt,
        _fnBindAction: Pt,
        _fnCallbackReg: Nt,
        _fnCallbackFire: jt,
        _fnLengthOverflow: Ot,
        _fnRenderer: Ht,
        _fnDataSource: Et,
        _fnRowAttributes: f,
        _fnCalculateEnd: function() {}
    }), ((L.fn.dataTable = $t).$ = L).fn.dataTableSettings = $t.settings, L.fn.dataTableExt = $t.ext, L.fn.DataTable = function(t) {
        return L(this).dataTable(t).api()
    }, L.each($t, function(t, e) {
        L.fn.DataTable[t] = e
    }), L.fn.dataTable
}),
function(n) {
    "function" == typeof define && define.amd ? define(["jquery", "datatables.net"], function(t) {
        return n(t, window, document)
    }) : "object" == typeof exports ? module.exports = function(t, e) {
        return t || (t = window), e && e.fn.dataTable || (e = require("datatables.net")(t, e).$), n(e, t, t.document)
    } : n(jQuery, window, document)

}(function(v, t, a, o) { //  EN ESTA FUNCION SE MODIFICA LA UBUCACION DE LA PALABRA BUSCAR EN LOS MODALES DE AGREGAR ENFERMEDADES 


    var r = v.fn.dataTable;
    return v.extend(!0, r.defaults, {
        dom: "<'row'<'col-sm-3 col-md-3'l><'col-sm-12 col-md-6'f>><'row'<'col-sm-12'tr>><'row'<'col-sm-12 col-md-4'i><'col-sm-12 col-md-8 derecha'p>>",
        renderer: "bootstrap"
    }), v.extend(r.ext.classes, {
        sWrapper: "dataTables_wrapper dt-bootstrap4",
        sFilterInput: "form-control",
        sLengthSelect: "form-control",
        sProcessing: "dataTables_processing card",
        sPageButton: "paginate_button page-item"
    }), r.ext.renderer.pageButton.bootstrap = function(i, t, s, e, u, c) {
        var d, f, n, p = new r.Api(i),
            h = i.oClasses,
            m = i.oLanguage.oPaginate,
            b = i.oLanguage.oAria.paginate || {},
            g = 0,
            y = function(t, e) {
                var n, a, o, r, l = function(t) {
                    t.preventDefault(), !v(t.currentTarget).hasClass("disabled") && p.page() != t.data.action && p.page(t.data.action).draw("page")
                };
                for (n = 0, a = e.length; n < a; n++)
                    if (r = e[n], v.isArray(r)) y(t, r);
                    else {
                        switch (f = d = "", r) {
                            case "ellipsis":
                                d = "&#x2026;", f = "disabled";
                                break;
                            case "first":
                                d = m.sFirst, f = r + (0 < u ? "" : " disabled");
                                break;
                            case "previous":
                                d = m.sPrevious, f = r + (0 < u ? "" : " disabled");
                                break;
                            case "next":
                                d = m.sNext, f = r + (u < c - 1 ? "" : " disabled");
                                break;
                            case "last":
                                d = m.sLast, f = r + (u < c - 1 ? "" : " disabled");
                                break;
                            default:
                                d = r + 1, f = u === r ? "active" : ""
                        }
                        d && (o = v("<li>", {
                            class: h.sPageButton + " " + f,
                            id: 0 === s && "string" == typeof r ? i.sTableId + "_" + r : null
                        }).append(v("<a>", {
                            href: "#",
                            "aria-controls": i.sTableId,
                            "aria-label": b[r],
                            "data-dt-idx": g,
                            tabindex: i.iTabIndex,
                            class: "page-link"
                        }).html(d)).appendTo(t), i.oApi._fnBindAction(o, {
                            action: r
                        }, l), g++)
                    }
            };
        try {
            n = v(t).find(a.activeElement).data("dt-idx")
        } catch (t) {}
        y(v(t).empty().html('<ul class="pagination"/>').children("ul"), e), n !== o && v(t).find("[data-dt-idx=" + n + "]").focus()
    }, r
}),
function(n) {
    "function" == typeof define && define.amd ? define(["jquery", "datatables.net"], function(t) {
        return n(t, window, document)
    }) : "object" == typeof exports ? module.exports = function(t, e) {
        return t || (t = window), e && e.fn.dataTable || (e = require("datatables.net")(t, e).$), n(e, t, t.document)
    } : n(jQuery, window, document)
}(function(h, i, r, c) {
    var o, m = h.fn.dataTable,
        n = 0,
        u = 0,
        s = m.ext.buttons,
        d = function(t, e) {
            void 0 === e && (e = {}), !0 === e && (e = {}), h.isArray(e) && (e = {
                buttons: e
            }), this.c = h.extend(!0, {}, d.defaults, e), e.buttons && (this.c.buttons = e.buttons), this.s = {
                dt: new m.Api(t),
                buttons: [],
                listenKeys: "",
                namespace: "dtb" + n++
            }, this.dom = {
                container: h("<" + this.c.dom.container.tag + "/>").addClass(this.c.dom.container.className)
            }, this._constructor()
        };
    h.extend(d.prototype, {
        action: function(t, e) {
            var n = this._nodeToButton(t);
            return e === c ? n.conf.action : (n.conf.action = e, this)
        },
        active: function(t, e) {
            var n = this._nodeToButton(t),
                a = this.c.dom.button.active;
            n = h(n.node);
            return e === c ? n.hasClass(a) : (n.toggleClass(a, e === c || e), this)
        },
        add: function(t, e) {
            var n = this.s.buttons;
            if ("string" == typeof e) {
                for (var a = e.split("-"), o = (n = this.s, 0), r = a.length - 1; o < r; o++) n = n.buttons[1 * a[o]];
                n = n.buttons, e = 1 * a[a.length - 1]
            }
            return this._expandButton(n, t, !1, e), this._draw(), this
        },
        container: function() {
            return this.dom.container
        },
        disable: function(t) {
            return t = this._nodeToButton(t), h(t.node).addClass(this.c.dom.button.disabled), this
        },
        destroy: function() {
            h("body").off("keyup." + this.s.namespace);
            var t, e, n = this.s.buttons.slice();
            for (t = 0, e = n.length; t < e; t++) this.remove(n[t].node);
            for (this.dom.container.remove(), t = 0, e = (n = this.s.dt.settings()[0]).length; t < e; t++)
                if (n.inst === this) {
                    n.splice(t, 1);
                    break
                }
            return this
        },
        enable: function(t, e) {
            if (!1 === e) return this.disable(t);
            var n = this._nodeToButton(t);
            return h(n.node).removeClass(this.c.dom.button.disabled), this
        },
        name: function() {
            return this.c.name
        },
        node: function(t) {
            return t = this._nodeToButton(t), h(t.node)
        },
        processing: function(t, e) {
            var n = this._nodeToButton(t);
            return e === c ? h(n.node).hasClass("processing") : (h(n.node).toggleClass("processing", e), this)
        },
        remove: function(t) {
            var e = this._nodeToButton(t),
                n = this._nodeToHost(t),
                a = this.s.dt;
            if (e.buttons.length)
                for (var o = e.buttons.length - 1; 0 <= o; o--) this.remove(e.buttons[o].node);
            return e.conf.destroy && e.conf.destroy.call(a.button(t), a, h(t), e.conf), this._removeKey(e.conf), h(e.node).remove(), t = h.inArray(e, n), n.splice(t, 1), this
        },
        text: function(t, e) {
            var n = this._nodeToButton(t),
                a = this.c.dom.collection.buttonLiner,
                o = (a = n.inCollection && a && a.tag ? a.tag : this.c.dom.buttonLiner.tag, this.s.dt),
                r = h(n.node),
                l = function(t) {
                    return "function" == typeof t ? t(o, r, n.conf) : t
                };
            return e === c ? l(n.conf.text) : (n.conf.text = e, a ? r.children(a).html(l(e)) : r.html(l(e)), this)
        },
        _constructor: function() {
            var n = this,
                t = this.s.dt,
                e = t.settings()[0],
                a = this.c.buttons;
            e._buttons || (e._buttons = []), e._buttons.push({
                inst: this,
                name: this.c.name
            });
            e = 0;
            for (var o = a.length; e < o; e++) this.add(a[e]);
            t.on("destroy", function() {
                n.destroy()
            }), h("body").on("keyup." + this.s.namespace, function(t) {
                if (!r.activeElement || r.activeElement === r.body) {
                    var e = String.fromCharCode(t.keyCode).toLowerCase(); - 1 !== n.s.listenKeys.toLowerCase().indexOf(e) && n._keypress(e, t)
                }
            })
        },
        _addKey: function(t) {
            t.key && (this.s.listenKeys += h.isPlainObject(t.key) ? t.key.key : t.key)
        },
        _draw: function(t, e) {
            t || (t = this.dom.container, e = this.s.buttons), t.children().detach();
            for (var n = 0, a = e.length; n < a; n++) t.append(e[n].inserter), t.append(" "), e[n].buttons && e[n].buttons.length && this._draw(e[n].collection, e[n].buttons)
        },
        _expandButton: function(t, e, n, a) {
            for (var o = this.s.dt, r = 0, l = (e = h.isArray(e) ? e : [e]).length; r < l; r++) {
                var i = this._resolveExtends(e[r]);
                if (i)
                    if (h.isArray(i)) this._expandButton(t, i, n, a);
                    else {
                        var s = this._buildButton(i, n);
                        if (s) {
                            if (a !== c ? (t.splice(a, 0, s), a++) : t.push(s), s.conf.buttons) {
                                var u = this.c.dom.collection;
                                s.collection = h("<" + u.tag + "/>").addClass(u.className).attr("role", "menu"), s.conf._collection = s.collection, this._expandButton(s.buttons, s.conf.buttons, !0, a)
                            }
                            i.init && i.init.call(o.button(s.node), o, h(s.node), i), 0
                        }
                    }
            }
        },
        _buildButton: function(e, t) {
            var n = this.c.dom.button,
                a = this.c.dom.buttonLiner,
                o = this.c.dom.collection,
                r = this.s.dt,
                l = function(t) {
                    return "function" == typeof t ? t(r, s, e) : t
                };
            if (t && o.button && (n = o.button), t && o.buttonLiner && (a = o.buttonLiner), e.available && !e.available(r, e)) return !1;
            var i = function(t, e, n, a) {
                    a.action.call(e.button(n), t, e, n, a), h(e.table().node()).triggerHandler("buttons-action.dt", [e.button(n), e, n, a])
                },
                s = h("<" + n.tag + "/>").addClass(n.className).attr("tabindex", this.s.dt.settings()[0].iTabIndex).attr("aria-controls", this.s.dt.table().node().id).on("click.dtb", function(t) {
                    t.preventDefault(), !s.hasClass(n.disabled) && e.action && i(t, r, s, e), s.blur()
                }).on("keyup.dtb", function(t) {
                    13 === t.keyCode && !s.hasClass(n.disabled) && e.action && i(t, r, s, e)
                });
            return "a" === n.tag.toLowerCase() && s.attr("href", "#"), a.tag ? (o = h("<" + a.tag + "/>").html(l(e.text)).addClass(a.className), "a" === a.tag.toLowerCase() && o.attr("href", "#"), s.append(o)) : s.html(l(e.text)), !1 === e.enabled && s.addClass(n.disabled), e.className && s.addClass(e.className), e.titleAttr && s.attr("title", l(e.titleAttr)), e.namespace || (e.namespace = ".dt-button-" + u++), a = (a = this.c.dom.buttonContainer) && a.tag ? h("<" + a.tag + "/>").addClass(a.className).append(s) : s, this._addKey(e), {
                conf: e,
                node: s.get(0),
                inserter: a,
                buttons: [],
                inCollection: t,
                collection: null
            }
        },
        _nodeToButton: function(t, e) {
            e || (e = this.s.buttons);
            for (var n = 0, a = e.length; n < a; n++) {
                if (e[n].node === t) return e[n];
                if (e[n].buttons.length) {
                    var o = this._nodeToButton(t, e[n].buttons);
                    if (o) return o
                }
            }
        },
        _nodeToHost: function(t, e) {
            e || (e = this.s.buttons);
            for (var n = 0, a = e.length; n < a; n++) {
                if (e[n].node === t) return e;
                if (e[n].buttons.length) {
                    var o = this._nodeToHost(t, e[n].buttons);
                    if (o) return o
                }
            }
        },
        _keypress: function(r, l) {
            var i = function(t) {
                for (var e = 0, n = t.length; e < n; e++) {
                    var a = t[e].conf,
                        o = t[e].node;
                    a.key && (a.key === r ? h(o).click() : !h.isPlainObject(a.key) || a.key.key !== r || a.key.shiftKey && !l.shiftKey || a.key.altKey && !l.altKey || a.key.ctrlKey && !l.ctrlKey || (!a.key.metaKey || l.metaKey) && h(o).click()), t[e].buttons.length && i(t[e].buttons)
                }
            };
            i(this.s.buttons)
        },
        _removeKey: function(t) {
            if (t.key) {
                var e = h.isPlainObject(t.key) ? t.key.key : t.key;
                t = this.s.listenKeys.split(""), e = h.inArray(e, t);
                t.splice(e, 1), this.s.listenKeys = t.join("")
            }
        },
        _resolveExtends: function(n) {
            var t, e, a = this.s.dt,
                o = function(t) {
                    for (var e = 0; !h.isPlainObject(t) && !h.isArray(t);) {
                        if (t === c) return;
                        if ("function" == typeof t) {
                            if (!(t = t(a, n))) return !1
                        } else if ("string" == typeof t) {
                            if (!s[t]) throw "Unknown button type: " + t;
                            t = s[t]
                        }
                        if (30 < ++e) throw "Buttons: Too many iterations"
                    }
                    return h.isArray(t) ? t : h.extend({}, t)
                };
            for (n = o(n); n && n.extend;) {
                if (!s[n.extend]) throw "Cannot extend unknown button type: " + n.extend;
                var r = o(s[n.extend]);
                if (h.isArray(r)) return r;
                if (!r) return !1;
                t = r.className, n = h.extend({}, r, n), t && n.className !== t && (n.className = t + " " + n.className);
                var l = n.postfixButtons;
                if (l) {
                    for (n.buttons || (n.buttons = []), t = 0, e = l.length; t < e; t++) n.buttons.push(l[t]);
                    n.postfixButtons = null
                }
                if (l = n.prefixButtons) {
                    for (n.buttons || (n.buttons = []), t = 0, e = l.length; t < e; t++) n.buttons.splice(t, 0, l[t]);
                    n.prefixButtons = null
                }
                n.extend = r.extend
            }
            return n
        }
    }), d.background = function(t, e, n) {
        n === c && (n = 400), t ? h("<div/>").addClass(e).css("display", "none").appendTo("body").fadeIn(n) : h("body > div." + e).fadeOut(n, function() {
            h(this).removeClass(e).remove()
        })
    }, d.instanceSelector = function(t, a) {
        if (!t) return h.map(a, function(t) {
            return t.inst
        });
        var o = [],
            r = h.map(a, function(t) {
                return t.name
            }),
            l = function(t) {
                if (h.isArray(t))
                    for (var e = 0, n = t.length; e < n; e++) l(t[e]);
                else "string" == typeof t ? -1 !== t.indexOf(",") ? l(t.split(",")) : -1 !== (t = h.inArray(h.trim(t), r)) && o.push(a[t].inst) : "number" == typeof t && o.push(a[t].inst)
            };
        return l(t), o
    }, d.buttonSelector = function(t, e) {
        for (var l = [], i = function(t, e, n) {
                for (var a, o, r = 0, l = e.length; r < l; r++)(a = e[r]) && (o = n !== c ? n + r : r + "", t.push({
                    node: a.node,
                    name: a.conf.name,
                    idx: o
                }), a.buttons && i(t, a.buttons, o + "-"))
            }, s = function(t, e) {
                var n, a, o = [];
                if (i(o, e.s.buttons), n = h.map(o, function(t) {
                        return t.node
                    }), h.isArray(t) || t instanceof h)
                    for (n = 0, a = t.length; n < a; n++) s(t[n], e);
                else if (null === t || t === c || "*" === t)
                    for (n = 0, a = o.length; n < a; n++) l.push({
                        inst: e,
                        node: o[n].node
                    });
                else if ("number" == typeof t) l.push({
                    inst: e,
                    node: e.s.buttons[t].node
                });
                else if ("string" == typeof t)
                    if (-1 !== t.indexOf(","))
                        for (n = 0, a = (o = t.split(",")).length; n < a; n++) s(h.trim(o[n]), e);
                    else if (t.match(/^\d+(\-\d+)*$/)) n = h.map(o, function(t) {
                    return t.idx
                }), l.push({
                    inst: e,
                    node: o[h.inArray(t, n)].node
                });
                else if (-1 !== t.indexOf(":name")) {
                    var r = t.replace(":name", "");
                    for (n = 0, a = o.length; n < a; n++) o[n].name === r && l.push({
                        inst: e,
                        node: o[n].node
                    })
                } else h(n).filter(t).each(function() {
                    l.push({
                        inst: e,
                        node: this
                    })
                });
                else "object" == typeof t && t.nodeName && (-1 !== (o = h.inArray(t, n)) && l.push({
                    inst: e,
                    node: n[o]
                }))
            }, n = 0, a = t.length; n < a; n++) s(e, t[n]);
        return l
    }, d.defaults = {
        buttons: ["copy", "excel", "csv", "pdf", "print"],
        name: "main",
        tabIndex: 0,
        dom: {
            container: {
                tag: "div",
                className: "dt-buttons"
            },
            collection: {
                tag: "div",
                className: "dt-button-collection"
            },
            button: {
                tag: "a",
                className: "dt-button",
                active: "active",
                disabled: "disabled"
            },
            buttonLiner: {
                tag: "span",
                className: ""
            }
        }
    }, d.version = "1.4.2", h.extend(s, {
        collection: {
            text: function(t) {
                return t.i18n("buttons.collection", "Collection")
            },
            className: "buttons-collection",
            action: function(t, n, e, a) {
                t = e.offset();
                var o = h(n.table().container()),
                    r = !1;
                h("div.dt-button-background").length && (r = h(".dt-button-collection").offset(), h("body").trigger("click.dtb-collection")), a._collection.addClass(a.collectionLayout).css("display", "none").appendTo("body").fadeIn(a.fade);
                var l = a._collection.css("position");
                r && "absolute" === l ? a._collection.css({
                    top: r.top,
                    left: r.left
                }) : "absolute" === l ? (a._collection.css({
                    top: t.top + e.outerHeight(),
                    left: t.left
                }), r = o.offset().top + o.height(), e = t.top + e.outerHeight() + a._collection.outerHeight() - r, r = t.top - a._collection.outerHeight(), (r = o.offset().top - r) < e && a._collection.css("top", t.top - a._collection.outerHeight() - 5), e = t.left + a._collection.outerWidth(), (o = o.offset().left + o.width()) < e && a._collection.css("left", t.left - (e - o))) : ((t = a._collection.height() / 2) > h(i).height() / 2 && (t = h(i).height() / 2), a._collection.css("marginTop", -1 * t)), a.background && d.background(!0, a.backgroundClassName, a.fade), setTimeout(function() {
                    h("div.dt-button-background").on("click.dtb-collection", function() {}), h("body").on("click.dtb-collection", function(t) {
                        var e = h.fn.addBack ? "addBack" : "andSelf";
                        h(t.target).parents()[e]().filter(a._collection).length || (a._collection.fadeOut(a.fade, function() {
                            a._collection.detach()
                        }), h("div.dt-button-background").off("click.dtb-collection"), d.background(!1, a.backgroundClassName, a.fade), h("body").off("click.dtb-collection"), n.off("buttons-action.b-internal"))
                    })
                }, 10), a.autoClose && n.on("buttons-action.b-internal", function() {
                    h("div.dt-button-background").click()
                })
            },
            background: !0,
            collectionLayout: "",
            backgroundClassName: "dt-button-background",
            autoClose: !1,
            fade: 400
        },
        copy: function(t, e) {
            return s.copyHtml5 ? "copyHtml5" : s.copyFlash && s.copyFlash.available(t, e) ? "copyFlash" : void 0
        },
        csv: function(t, e) {
            return s.csvHtml5 && s.csvHtml5.available(t, e) ? "csvHtml5" : s.csvFlash && s.csvFlash.available(t, e) ? "csvFlash" : void 0
        },
        excel: function(t, e) {
            return s.excelHtml5 && s.excelHtml5.available(t, e) ? "excelHtml5" : s.excelFlash && s.excelFlash.available(t, e) ? "excelFlash" : void 0
        },
        pdf: function(t, e) {
            return s.pdfHtml5 && s.pdfHtml5.available(t, e) ? "pdfHtml5" : s.pdfFlash && s.pdfFlash.available(t, e) ? "pdfFlash" : void 0
        },
        pageLength: function(t) {
            t = t.settings()[0].aLengthMenu;
            var e = h.isArray(t[0]) ? t[0] : t,
                n = h.isArray(t[0]) ? t[1] : t,
                o = function(t) {
                    return t.i18n("buttons.pageLength", {
                        "-1": "Show all rows",
                        _: "Show %d rows"
                    }, t.page.len())
                };
            return {
                extend: "collection",
                text: o,
                className: "buttons-page-length",
                autoClose: !0,
                buttons: h.map(e, function(o, t) {
                    return {
                        text: n[t],
                        className: "button-page-length",
                        action: function(t, e) {
                            e.page.len(o).draw()
                        },
                        init: function(t, e, n) {
                            var a = this;
                            e = function() {
                                a.active(t.page.len() === o)
                            };
                            t.on("length.dt" + n.namespace, e), e()
                        },
                        destroy: function(t, e, n) {
                            t.off("length.dt" + n.namespace)
                        }
                    }
                }),
                init: function(t, e, n) {
                    var a = this;
                    t.on("length.dt" + n.namespace, function() {
                        a.text(o(t))
                    })
                },
                destroy: function(t, e, n) {
                    t.off("length.dt" + n.namespace)
                }
            }
        }
    }), m.Api.register("buttons()", function(e, n) {
        n === c && (n = e, e = c), this.selector.buttonGroup = e;
        var t = this.iterator(!0, "table", function(t) {
            if (t._buttons) return d.buttonSelector(d.instanceSelector(e, t._buttons), n)
        }, !0);
        return t._groupSelector = e, t
    }), m.Api.register("button()", function(t, e) {
        var n = this.buttons(t, e);
        return 1 < n.length && n.splice(1, n.length), n
    }), m.Api.registerPlural("buttons().active()", "button().active()", function(e) {
        return e === c ? this.map(function(t) {
            return t.inst.active(t.node)
        }) : this.each(function(t) {
            t.inst.active(t.node, e)
        })
    }), m.Api.registerPlural("buttons().action()", "button().action()", function(e) {
        return e === c ? this.map(function(t) {
            return t.inst.action(t.node)
        }) : this.each(function(t) {
            t.inst.action(t.node, e)
        })
    }), m.Api.register(["buttons().enable()", "button().enable()"], function(e) {
        return this.each(function(t) {
            t.inst.enable(t.node, e)
        })
    }), m.Api.register(["buttons().disable()", "button().disable()"], function() {
        return this.each(function(t) {
            t.inst.disable(t.node)
        })
    }), m.Api.registerPlural("buttons().nodes()", "button().node()", function() {
        var e = h();
        return h(this.each(function(t) {
            e = e.add(t.inst.node(t.node))
        })), e
    }), m.Api.registerPlural("buttons().processing()", "button().processing()", function(e) {
        return e === c ? this.map(function(t) {
            return t.inst.processing(t.node)
        }) : this.each(function(t) {
            t.inst.processing(t.node, e)
        })
    }), m.Api.registerPlural("buttons().text()", "button().text()", function(e) {
        return e === c ? this.map(function(t) {
            return t.inst.text(t.node)
        }) : this.each(function(t) {
            t.inst.text(t.node, e)
        })
    }), m.Api.registerPlural("buttons().trigger()", "button().trigger()", function() {
        return this.each(function(t) {
            t.inst.node(t.node).trigger("click")
        })
    }), m.Api.registerPlural("buttons().containers()", "buttons().container()", function() {
        var a = h(),
            o = this._groupSelector;
        return this.iterator(!0, "table", function(t) {
            if (t._buttons)
                for (var e = 0, n = (t = d.instanceSelector(o, t._buttons)).length; e < n; e++) a = a.add(t[e].container())
        }), a
    }), m.Api.register("button().add()", function(t, e) {
        var n = this.context;
        return n.length && ((n = d.instanceSelector(this._groupSelector, n[0]._buttons)).length && n[0].add(e, t)), this.button(this._groupSelector, t)
    }), m.Api.register("buttons().destroy()", function() {
        return this.pluck("inst").unique().each(function(t) {
            t.destroy()
        }), this
    }), m.Api.registerPlural("buttons().remove()", "buttons().remove()", function() {
        return this.each(function(t) {
            t.inst.remove(t.node)
        }), this
    }), m.Api.register("buttons.info()", function(t, e, n) {
        var a = this;
        return !1 === t ? (h("#datatables_buttons_info").fadeOut(function() {
            h(this).remove()
        }), clearTimeout(o), o = null) : (o && clearTimeout(o), h("#datatables_buttons_info").length && h("#datatables_buttons_info").remove(), h('<div id="datatables_buttons_info" class="dt-button-info"/>').html(t ? "<h2>" + t + "</h2>" : "").append(h("<div/>")["string" == typeof e ? "html" : "append"](e)).css("display", "none").appendTo("body").fadeIn(), n !== c && 0 !== n && (o = setTimeout(function() {
            a.buttons.info(!1)
        }, n))), this
    }), m.Api.register("buttons.exportData()", function(t) {
        if (this.context.length) {
            for (var n = new m.Api(this.context[0]), a = h.extend(!0, {}, {
                    rows: null,
                    columns: "",
                    modifier: {
                        search: "applied",
                        order: "applied"
                    },
                    orthogonal: "display",
                    stripHtml: !0,
                    stripNewlines: !0,
                    decodeEntities: !0,
                    trim: !0,
                    format: {
                        header: function(t) {
                            return e(t)
                        },
                        footer: function(t) {
                            return e(t)
                        },
                        body: function(t) {
                            return e(t)
                        }
                    }
                }, t), e = function(t) {
                    return "string" != typeof t || (t = t.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ""), a.stripHtml && (t = t.replace(/<[^>]*>/g, "")), a.trim && (t = t.replace(/^\s+|\s+$/g, "")), a.stripNewlines && (t = t.replace(/\n/g, " ")), a.decodeEntities && (b.innerHTML = t, t = b.value)), t
                }, o = (t = n.columns(a.columns).indexes().map(function(t) {
                    var e = n.column(t).header();
                    return a.format.header(e.innerHTML, t, e)
                }).toArray(), n.table().footer() ? n.columns(a.columns).indexes().map(function(t) {
                    var e = n.column(t).footer();
                    return a.format.footer(e ? e.innerHTML : "", t, e)
                }).toArray() : null), r = n.rows(a.rows, a.modifier).indexes().toArray(), l = (r = (l = n.cells(r, a.columns)).render(a.orthogonal).toArray(), l.nodes().toArray()), i = t.length, s = 0 < i ? r.length / i : 0, u = Array(s), c = 0, d = 0; d < s; d++) {
                for (var f = Array(i), p = 0; p < i; p++) f[p] = a.format.body(r[c], d, p, l[c]), c++;
                u[d] = f
            }
            return {
                header: t,
                footer: o,
                body: u
            }
        }
    }), m.Api.register("buttons.exportInfo()", function(t) {
        var e;
        t || (t = {});
        var n = t;
        return "function" == typeof(e = "*" === n.filename && "*" !== n.title && n.title !== c ? n.title : n.filename) && (e = e()), e === c || null === e ? e = null : (-1 !== e.indexOf("*") && (e = h.trim(e.replace("*", h("title").text()))), e = e.replace(/[^a-zA-Z0-9_\u00A1-\uFFFF\.,\-_ !\(\)]/g, ""), (n = a(n.extension)) || (n = ""), e += n), {
            filename: e,
            title: n = null === (n = a(t.title)) ? null : -1 !== n.indexOf("*") ? n.replace("*", h("title").text() || "Exported data") : n,
            messageTop: l(this, t.messageTop || t.message, "top"),
            messageBottom: l(this, t.messageBottom, "bottom")
        }
    });
    var a = function(t) {
            return null === t || t === c ? null : "function" == typeof t ? t() : t
        },
        l = function(t, e, n) {
            return null === (e = a(e)) ? null : (t = h("caption", t.table().container()).eq(0), "*" === e ? t.css("caption-side") !== n ? null : t.length ? t.text() : "" : e)
        },
        b = h("<textarea/>")[0];
    return h.fn.dataTable.Buttons = d, h.fn.DataTable.Buttons = d, h(r).on("init.dt plugin-init.dt", function(t, e) {
        if ("dt" === t.namespace) {
            var n = e.oInit.buttons || m.defaults.buttons;
            n && !e._buttons && new d(e, n).container()
        }
    }), m.ext.feature.push({
        fnInit: function(t) {
            var e = (t = new m.Api(t)).init().buttons || m.defaults.buttons;
            return new d(t, e).container()
        },
        cFeature: "B"
    }), d
}),
function(n) {
    "function" == typeof define && define.amd ? define(["jquery", "datatables.net-bs4", "datatables.net-buttons"], function(t) {
        return n(t, window, document)
    }) : "object" == typeof exports ? module.exports = function(t, e) {
        return t || (t = window), e && e.fn.dataTable || (e = require("datatables.net-bs4")(t, e).$), e.fn.dataTable.Buttons || require("datatables.net-buttons")(t, e), n(e, t.document)
    } : n(jQuery, window, document)
}(function(t) {
    var e = t.fn.dataTable;
    return t.extend(!0, e.Buttons.defaults, {
        dom: {
            container: {
                className: "dt-buttons"
            },
            button: {
                className: "btn btn-round  btn-primary"
            },
            collection: {
                tag: "div",
                className: "dt-button-collection dropdown-menu",
                button: {
                    tag: "a",
                    className: "dt-button dropdown-item",
                    active: "active",
                    disabled: "disabled"
                }
            }
        }
    }), e.ext.buttons.collection.className += " dropdown-toggle", e.Buttons
}),
function(n) {
    "function" == typeof define && define.amd ? define(["jquery", "datatables.net", "datatables.net-buttons"], function(t) {
        return n(t, window, document)
    }) : "object" == typeof exports ? module.exports = function(t, e) {
        return t || (t = window), e && e.fn.dataTable || (e = require("datatables.net")(t, e).$), e.fn.dataTable.Buttons || require("datatables.net-buttons")(t, e), n(e, t, t.document)
    } : n(jQuery, window, document)
}(function(t, e, n, o) {
    return e = t.fn.dataTable, t.extend(e.ext.buttons, {
        colvis: function(t, e) {
            return {
                extend: "collection",
                text: function(t) {
                    return t.i18n("buttons.colvis", "Column visibility")
                },
                className: "buttons-colvis",
                buttons: [{
                    extend: "columnsToggle",
                    columns: e.columns,
                    columnText: e.columnText
                }]
            }
        },
        columnsToggle: function(t, e) {
            return t.columns(e.columns).indexes().map(function(t) {
                return {
                    extend: "columnToggle",
                    columns: t,
                    columnText: e.columnText
                }
            }).toArray()
        },
        columnToggle: function(t, e) {
            return {
                extend: "columnVisibility",
                columns: e.columns,
                columnText: e.columnText
            }
        },
        columnsVisibility: function(t, e) {
            return t.columns(e.columns).indexes().map(function(t) {
                return {
                    extend: "columnVisibility",
                    columns: t,
                    visibility: e.visibility,
                    columnText: e.columnText
                }
            }).toArray()
        },
        columnVisibility: {
            columns: o,
            text: function(t, e, n) {
                return n._columnText(t, n)
            },
            className: "buttons-columnVisibility",
            action: function(t, e, n, a) {
                e = (t = e.columns(a.columns)).visible(), t.visible(a.visibility !== o ? a.visibility : !(e.length && e[0]))
            },
            init: function(a, t, o) {
                var r = this;
                a.on("column-visibility.dt" + o.namespace, function(t, e) {
                    !e.bDestroying && e.nTable == a.settings()[0].nTable && r.active(a.column(o.columns).visible())
                }).on("column-reorder.dt" + o.namespace, function(t, e, n) {
                    1 === a.columns(o.columns).count() && ("number" == typeof o.columns && (o.columns = n.mapping[o.columns]), t = a.column(o.columns), r.text(o._columnText(a, o)), r.active(t.visible()))
                }), this.active(a.column(o.columns).visible())
            },
            destroy: function(t, e, n) {
                t.off("column-visibility.dt" + n.namespace).off("column-reorder.dt" + n.namespace)
            },
            _columnText: function(t, e) {
                var n = t.column(e.columns).index(),
                    a = t.settings()[0].aoColumns[n].sTitle.replace(/\n/g, " ").replace(/<br\s*\/?>/gi, " ").replace(/<.*?>/g, "").replace(/^\s+|\s+$/g, "");
                return e.columnText ? e.columnText(t, n, a) : a
            }
        },
        colvisRestore: {
            className: "buttons-colvisRestore",
            text: function(t) {
                return t.i18n("buttons.colvisRestore", "Restore visibility")
            },
            init: function(e, t, n) {
                n._visOriginal = e.columns().indexes().map(function(t) {
                    return e.column(t).visible()
                }).toArray()
            },
            action: function(t, e, n, a) {
                e.columns().every(function(t) {
                    t = e.colReorder && e.colReorder.transpose ? e.colReorder.transpose(t, "toOriginal") : t, this.visible(a._visOriginal[t])
                })
            }
        },
        colvisGroup: {
            className: "buttons-colvisGroup",
            action: function(t, e, n, a) {
                e.columns(a.show).visible(!0, !1), e.columns(a.hide).visible(!1, !1), e.columns.adjust()
            },
            show: [],
            hide: []
        }
    }), e.Buttons
}),
function(o) {
    "function" == typeof define && define.amd ? define(["jquery", "datatables.net", "datatables.net-buttons"], function(t) {
        return o(t, window, document)
    }) : "object" == typeof exports ? module.exports = function(t, e, n, a) {
        return t || (t = window), e && e.fn.dataTable || (e = require("datatables.net")(t, e).$), e.fn.dataTable.Buttons || require("datatables.net-buttons")(t, e), o(e, t, t.document, n, a)
    } : o(jQuery, window, document)
}(function(b, g, d, y, i, v) {
    function x(t) {
        for (var e = ""; 0 <= t;) e = String.fromCharCode(t % 26 + 65) + e, t = Math.floor(t / 26) - 1;
        return e
    }

    function S(t, e, n) {
        var a = t.createElement(e);
        return n && (n.attr && b(a).attr(n.attr), n.children && b.each(n.children, function(t, e) {
            a.appendChild(e)
        }), null !== n.text && n.text !== v && a.appendChild(t.createTextNode(n.text))), a
    }

    function I(t, e) {
        var n, a = t.header[e].length;
        t.footer && t.footer[e].length > a && (a = t.footer[e].length);
        for (var o = 0, r = t.body.length; o < r; o++)
            if (a < (n = -1 !== (n = null !== (n = t.body[o][e]) && n !== v ? n.toString() : "").indexOf("\n") ? ((n = n.split("\n")).sort(function(t, e) {
                    return e.length - t.length
                }), n[0].length) : n.length) && (a = n), 40 < a) return 52;
        return 6 < (a *= 1.3) ? a : 6
    }
    var D, t = b.fn.dataTable,
        s = "undefined" != typeof self && self || void 0 !== g && g || this.content;
    if (void 0 === s || "undefined" != typeof navigator && /MSIE [1-9]\./.test(navigator.userAgent)) D = void 0;
    else {
        var u = s.document.createElementNS("http://www.w3.org/1999/xhtml", "a"),
            c = "download" in u,
            f = /constructor/i.test(s.HTMLElement) || s.safari,
            p = /CriOS\/[\d]+/.test(navigator.userAgent),
            h = function(t) {
                (s.setImmediate || s.setTimeout)(function() {
                    throw t
                }, 0)
            },
            m = function(t) {
                setTimeout(function() {
                    "string" == typeof t ? (s.URL || s.webkitURL || s).revokeObjectURL(t) : t.remove()
                }, 4e4)
            },
            w = function(t) {
                return /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(t.type) ? new Blob([String.fromCharCode(65279), t], {
                    type: t.type
                }) : t
            },
            a = function(t, e, n) {
                n || (t = w(t));
                var a, o = this,
                    r = (n = "application/octet-stream" === t.type, function() {
                        for (var t, e = (t = [].concat(t = ["writestart", "progress", "write", "writeend"])).length; e--;) {
                            var n = o["on" + t[e]];
                            if ("function" == typeof n) try {
                                n.call(o, o)
                            } catch (t) {
                                h(t)
                            }
                        }
                    });
                if (o.readyState = o.INIT, c) a = (s.URL || s.webkitURL || s).createObjectURL(t), setTimeout(function() {
                    u.href = a, u.download = e;
                    var t = new MouseEvent("click");
                    u.dispatchEvent(t), r(), m(a), o.readyState = o.DONE
                });
                else if ((p || n && f) && s.FileReader) {
                    var l = new FileReader;
                    l.onloadend = function() {
                        var t = p ? l.result : l.result.replace(/^data:[^;]*;/, "data:attachment/file;");
                        s.open(t, "_blank") || (s.location.href = t), o.readyState = o.DONE, r()
                    }, l.readAsDataURL(t), o.readyState = o.INIT
                } else a || (a = (s.URL || s.webkitURL || s).createObjectURL(t)), n ? s.location.href = a : s.open(a, "_blank") || (s.location.href = a), o.readyState = o.DONE, r(), m(a)
            },
            e = a.prototype;
        D = "undefined" != typeof navigator && navigator.msSaveOrOpenBlob ? function(t, e, n) {
            return e = e || t.name || "download", n || (t = w(t)), navigator.msSaveOrOpenBlob(t, e)
        } : (e.abort = function() {}, e.readyState = e.INIT = 0, e.WRITING = 1, e.DONE = 2, e.error = e.onwritestart = e.onprogress = e.onwrite = e.onabort = e.onerror = e.onwriteend = null, function(t, e, n) {
            return new a(t, e || t.name || "download", n)
        })
    }
    t.fileSave = D;
    var _ = function(t) {
            return t.newline ? t.newline : navigator.userAgent.match(/Windows/) ? "\r\n" : "\n"
        },
        T = function(t, e) {
            for (var n = _(e), a = t.buttons.exportData(e.exportOptions), o = e.fieldBoundary, r = e.fieldSeparator, l = RegExp(o, "g"), i = e.escapeChar !== v ? e.escapeChar : "\\", s = function(t) {
                    for (var e = "", n = 0, a = t.length; n < a; n++) 0 < n && (e += r), e += o ? o + ("" + t[n]).replace(l, i + o) + o : t[n];
                    return e
                }, u = e.header ? s(a.header) + n : "", c = e.footer && a.footer ? n + s(a.footer) : "", d = [], f = 0, p = a.body.length; f < p; f++) d.push(s(a.body[f]));
            return {
                str: u + d.join(n) + c,
                rows: d.length
            }
        },
        C = function() {
            if (-1 === navigator.userAgent.indexOf("Safari") || -1 !== navigator.userAgent.indexOf("Chrome") || -1 !== navigator.userAgent.indexOf("Opera")) return !1;
            var t = navigator.userAgent.match(/AppleWebKit\/(\d+\.\d+)/);
            return !!(t && 1 < t.length && 1 * t[1] < 603.1)
        };
    try {
        var F, A = new XMLSerializer
    } catch (t) {}
    var k = {
            "_rels/.rels": '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>',
            "xl/_rels/workbook.xml.rels": '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>',
            "[Content_Types].xml": '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="xml" ContentType="application/xml" /><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml" /><Default Extension="jpeg" ContentType="image/jpeg" /><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml" /><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml" /><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml" /></Types>',
            "xl/workbook.xml": '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><fileVersion appName="xl" lastEdited="5" lowestEdited="5" rupBuild="24816"/><workbookPr showInkAnnotation="0" autoCompressPictures="0"/><bookViews><workbookView xWindow="0" yWindow="0" windowWidth="25600" windowHeight="19020" tabRatio="500"/></bookViews><sheets><sheet name="" sheetId="1" r:id="rId1"/></sheets></workbook>',
            "xl/worksheets/sheet1.xml": '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac"><sheetData/><mergeCells count="0"/></worksheet>',
            "xl/styles.xml": '<?xml version="1.0" encoding="UTF-8"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac"><numFmts count="6"><numFmt numFmtId="164" formatCode="#,##0.00_- [$$-45C]"/><numFmt numFmtId="165" formatCode="&quot;£&quot;#,##0.00"/><numFmt numFmtId="166" formatCode="[$€-2] #,##0.00"/><numFmt numFmtId="167" formatCode="0.0%"/><numFmt numFmtId="168" formatCode="#,##0;(#,##0)"/><numFmt numFmtId="169" formatCode="#,##0.00;(#,##0.00)"/></numFmts><fonts count="5" x14ac:knownFonts="1"><font><sz val="11" /><name val="Calibri" /></font><font><sz val="11" /><name val="Calibri" /><color rgb="FFFFFFFF" /></font><font><sz val="11" /><name val="Calibri" /><b /></font><font><sz val="11" /><name val="Calibri" /><i /></font><font><sz val="11" /><name val="Calibri" /><u /></font></fonts><fills count="6"><fill><patternFill patternType="none" /></fill><fill/><fill><patternFill patternType="solid"><fgColor rgb="FFD9D9D9" /><bgColor indexed="64" /></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FFD99795" /><bgColor indexed="64" /></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="ffc6efce" /><bgColor indexed="64" /></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="ffc6cfef" /><bgColor indexed="64" /></patternFill></fill></fills><borders count="2"><border><left /><right /><top /><bottom /><diagonal /></border><border diagonalUp="false" diagonalDown="false"><left style="thin"><color auto="1" /></left><right style="thin"><color auto="1" /></right><top style="thin"><color auto="1" /></top><bottom style="thin"><color auto="1" /></bottom><diagonal /></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" /></cellStyleXfs><cellXfs count="67"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment horizontal="left"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment horizontal="center"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment horizontal="right"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment horizontal="fill"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment textRotation="90"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment wrapText="1"/></xf><xf numFmtId="9"   fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="164" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="165" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="166" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="167" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="168" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="169" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="3" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="4" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="1" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="2" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0" /></cellStyles><dxfs count="0" /><tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4" /></styleSheet>'
        },
        B = [{
            match: /^\-?\d+\.\d%$/,
            style: 60,
            fmt: function(t) {
                return t / 100
            }
        }, {
            match: /^\-?\d+\.?\d*%$/,
            style: 56,
            fmt: function(t) {
                return t / 100
            }
        }, {
            match: /^\-?\$[\d,]+.?\d*$/,
            style: 57
        }, {
            match: /^\-?£[\d,]+.?\d*$/,
            style: 58
        }, {
            match: /^\-?€[\d,]+.?\d*$/,
            style: 59
        }, {
            match: /^\-?\d+$/,
            style: 65
        }, {
            match: /^\-?\d+\.\d{2}$/,
            style: 66
        }, {
            match: /^\([\d,]+\)$/,
            style: 61,
            fmt: function(t) {
                return -1 * t.replace(/[\(\)]/g, "")
            }
        }, {
            match: /^\([\d,]+\.\d{2}\)$/,
            style: 62,
            fmt: function(t) {
                return -1 * t.replace(/[\(\)]/g, "")
            }
        }, {
            match: /^\-?[\d,]+$/,
            style: 63
        }, {
            match: /^\-?[\d,]+\.\d{2}$/,
            style: 64
        }];
    return t.ext.buttons.copyHtml5 = {
        className: "buttons-copy buttons-html5",
        text: function(t) {
            return t.i18n("buttons.copy", "Copy")
        },
        action: function(t, e, n, a) {
            this.processing(!0);
            var o = this,
                r = (t = T(e, a), e.buttons.exportInfo(a)),
                l = _(a),
                i = t.str;
            n = b("<div/>").css({
                height: 1,
                width: 1,
                overflow: "hidden",
                position: "fixed",
                top: 0,
                left: 0
            });
            if (r.title && (i = r.title + l + l + i), r.messageTop && (i = r.messageTop + l + l + i), r.messageBottom && (i = i + l + l + r.messageBottom), a.customize && (i = a.customize(i, a)), a = b("<textarea readonly/>").val(i).appendTo(n), d.queryCommandSupported("copy")) {
                n.appendTo(e.table().container()), a[0].focus(), a[0].select();
                try {
                    var s = d.execCommand("copy");
                    if (n.remove(), s) return e.buttons.info(e.i18n("buttons.copyTitle", "Copy to clipboard"), e.i18n("buttons.copySuccess", {
                        1: "Copied one row to clipboard",
                        _: "Copied %d rows to clipboard"
                    }, t.rows), 2e3), void this.processing(!1)
                } catch (t) {}
            }
            s = b("<span>" + e.i18n("buttons.copyKeys", "Press <i>ctrl</i> or <i>⌘</i> + <i>C</i> to copy the table data<br>to your system clipboard.<br><br>To cancel, click this message or press escape.") + "</span>").append(n), e.buttons.info(e.i18n("buttons.copyTitle", "Copy to clipboard"), s, 0), a[0].focus(), a[0].select();
            var u = b(s).closest(".dt-button-info"),
                c = function() {
                    u.off("click.buttons-copy"), b(d).off(".buttons-copy"), e.buttons.info(!1)
                };
            u.on("click.buttons-copy", c), b(d).on("keydown.buttons-copy", function(t) {
                27 === t.keyCode && (c(), o.processing(!1))
            }).on("copy.buttons-copy cut.buttons-copy", function() {
                c(), o.processing(!1)
            })
        },
        exportOptions: {},
        fieldSeparator: "\t",
        fieldBoundary: "",
        header: !0,
        footer: !1,
        title: "*",
        messageTop: "*",
        messageBottom: "*"
    }, t.ext.buttons.csvHtml5 = {
        bom: !1,
        className: "buttons-csv buttons-html5",
        available: function() {
            return g.FileReader !== v && g.Blob
        },
        text: function(t) {
            return t.i18n("buttons.csv", "CSV")
        },
        action: function(t, e, n, a) {
            this.processing(!0), t = T(e, a).str, e = e.buttons.exportInfo(a), n = a.charset, a.customize && (t = a.customize(t, a)), !1 !== n ? (n || (n = d.characterSet || d.charset), n && (n = ";charset=" + n)) : n = "", a.bom && (t = "\ufeff" + t), D(new Blob([t], {
                type: "text/csv" + n
            }), e.filename, !0), this.processing(!1)
        },
        filename: "*",
        extension: ".csv",
        exportOptions: {},
        fieldSeparator: ",",
        fieldBoundary: '"',
        escapeChar: '"',
        charset: null,
        header: !0,
        footer: !1
    }, t.ext.buttons.excelHtml5 = {
        className: "buttons-excel buttons-html5",
        available: function() {
            return g.FileReader !== v && (y || g.JSZip) !== v && !C() && A
        },
        text: function(t) {
            return t.i18n("buttons.excel", "Excel")
        },
        action: function(t, e, n, a) {
            this.processing(!0);
            var s, u, o, r, l = this,
                c = 0,
                d = (t = function(t) {
                    return b.parseXML(k[t])
                })("xl/worksheets/sheet1.xml"),
                f = d.getElementsByTagName("sheetData")[0],
                i = (t = {
                    _rels: {
                        ".rels": t("_rels/.rels")
                    },
                    xl: {
                        _rels: {
                            "workbook.xml.rels": t("xl/_rels/workbook.xml.rels")
                        },
                        "workbook.xml": t("xl/workbook.xml"),
                        "styles.xml": t("xl/styles.xml"),
                        worksheets: {
                            "sheet1.xml": d
                        }
                    },
                    "[Content_Types].xml": t("[Content_Types].xml")
                }, n = e.buttons.exportData(a.exportOptions), function(t) {
                    u = S(d, "row", {
                        attr: {
                            r: s = c + 1
                        }
                    });
                    for (var e = 0, n = t.length; e < n; e++) {
                        var a = x(e) + "" + s,
                            o = null;
                        if (null !== t[e] && t[e] !== v && "" !== t[e]) {
                            t[e] = b.trim(t[e]);
                            for (var r = 0, l = B.length; r < l; r++) {
                                var i = B[r];
                                if (t[e].match && !t[e].match(/^0\d+/) && t[e].match(i.match)) {
                                    o = t[e].replace(/[^\d\.\-]/g, ""), i.fmt && (o = i.fmt(o)), o = S(d, "c", {
                                        attr: {
                                            r: a,
                                            s: i.style
                                        },
                                        children: [S(d, "v", {
                                            text: o
                                        })]
                                    });
                                    break
                                }
                            }
                            o || (o = "number" == typeof t[e] || t[e].match && t[e].match(/^-?\d+(\.\d+)?$/) && !t[e].match(/^0\d+/) ? S(d, "c", {
                                attr: {
                                    t: "n",
                                    r: a
                                },
                                children: [S(d, "v", {
                                    text: t[e]
                                })]
                            }) : (i = t[e].replace ? t[e].replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, "") : t[e], S(d, "c", {
                                attr: {
                                    t: "inlineStr",
                                    r: a
                                },
                                children: {
                                    row: S(d, "is", {
                                        children: {
                                            row: S(d, "t", {
                                                text: i
                                            })
                                        }
                                    })
                                }
                            }))), u.appendChild(o)
                        }
                    }
                    f.appendChild(u), c++
                });
            b("sheets sheet", t.xl["workbook.xml"]).attr("name", (r = "Sheet1", (o = a).sheetName && (r = o.sheetName.replace(/[\[\]\*\/\\\?\:]/g, "")), r)), a.customizeData && a.customizeData(n);
            var p = function(t, e) {
                    var n = b("mergeCells", d);
                    n[0].appendChild(S(d, "mergeCell", {
                        attr: {
                            ref: "A" + t + ":" + x(e) + t
                        }
                    })), n.attr("count", n.attr("count") + 1), b("row:eq(" + (t - 1) + ") c", d).attr("s", "51")
                },
                h = e.buttons.exportInfo(a);
            h.title && (i([h.title], c), p(c, n.header.length - 1)), h.messageTop && (i([h.messageTop], c), p(c, n.header.length - 1)), a.header && (i(n.header, c), b("row:last c", d).attr("s", "2"));
            e = 0;
            for (var m = n.body.length; e < m; e++) i(n.body[e], c);
            for (a.footer && n.footer && (i(n.footer, c), b("row:last c", d).attr("s", "2")), h.messageBottom && (i([h.messageBottom], c), p(c, n.header.length - 1)), e = S(d, "cols"), b("worksheet", d).prepend(e), i = 0, p = n.header.length; i < p; i++) e.appendChild(S(d, "col", {
                attr: {
                    min: i + 1,
                    max: i + 1,
                    width: I(n, i),
                    customWidth: 1
                }
            }));
            a.customize && a.customize(t), n = {
                    type: "blob",
                    mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                },
                function i(s, t) {
                    F === v && (F = -1 === A.serializeToString(b.parseXML(k["xl/worksheets/sheet1.xml"])).indexOf("xmlns:r")), b.each(t, function(t, e) {
                        if (b.isPlainObject(e)) i(n = s.folder(t), e);
                        else {
                            if (F) {
                                var n, a, o, r = [];
                                for (a = (n = e.childNodes[0]).attributes.length - 1; 0 <= a; a--) {
                                    o = n.attributes[a].nodeName;
                                    var l = n.attributes[a].nodeValue; - 1 !== o.indexOf(":") && (r.push({
                                        name: o,
                                        value: l
                                    }), n.removeAttribute(o))
                                }
                                for (a = 0, o = r.length; a < o; a++)(l = e.createAttribute(r[a].name.replace(":", "_dt_b_namespace_token_"))).value = r[a].value, n.setAttributeNode(l)
                            }
                            n = A.serializeToString(e), F && (-1 === n.indexOf("<?xml") && (n = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' + n), n = n.replace(/_dt_b_namespace_token_/g, ":")), n = n.replace(/<([^<>]*?) xmlns=""([^<>]*?)>/g, "<$1 $2>"), s.file(t, n)
                        }
                    })
                }(a = new(y || g.JSZip), t), a.generateAsync ? a.generateAsync(n).then(function(t) {
                    D(t, h.filename), l.processing(!1)
                }) : (D(a.generate(n), h.filename), this.processing(!1))
        },
        filename: "*",
        extension: ".xlsx",
        exportOptions: {},
        header: !0,
        footer: !1,
        title: "*",
        messageTop: "*",
        messageBottom: "*"
    }, t.ext.buttons.pdfHtml5 = {
        className: "buttons-pdf buttons-html5",
        available: function() {
            return g.FileReader !== v && (i || g.pdfMake)
        },
        text: function(t) {
            return t.i18n("buttons.pdf", "PDF")
        },
        action: function(t, e, n, a) {
            this.processing(!0);
            var o = this,
                r = (t = e.buttons.exportData(a.exportOptions), e.buttons.exportInfo(a));
            e = [];
            a.header && e.push(b.map(t.header, function(t) {
                return {
                    text: "string" == typeof t ? t : t + "",
                    style: "tableHeader"
                }
            }));
            var l = 0;
            for (n = t.body.length; l < n; l++) e.push(b.map(t.body[l], function(t) {
                return {
                    text: "string" == typeof t ? t : t + "",
                    style: l % 2 ? "tableBodyEven" : "tableBodyOdd"
                }
            }));
            a.footer && t.footer && e.push(b.map(t.footer, function(t) {
                return {
                    text: "string" == typeof t ? t : t + "",
                    style: "tableFooter"
                }
            })), e = {
                pageSize: a.pageSize,
                pageOrientation: a.orientation,
                content: [{
                    table: {
                        headerRows: 1,
                        body: e
                    },
                    layout: "noBorders"
                }],
                styles: {
                    tableHeader: {
                        bold: !0,
                        fontSize: 11,
                        color: "white",
                        fillColor: "#2d4154",
                        alignment: "center"
                    },
                    tableBodyEven: {},
                    tableBodyOdd: {
                        fillColor: "#f3f3f3"
                    },
                    tableFooter: {
                        bold: !0,
                        fontSize: 11,
                        color: "white",
                        fillColor: "#2d4154"
                    },
                    title: {
                        alignment: "center",
                        fontSize: 15
                    },
                    message: {}
                },
                defaultStyle: {
                    fontSize: 10
                }
            }, r.messageTop && e.content.unshift({
                text: r.messageTop,
                style: "message",
                margin: [0, 0, 0, 12]
            }), r.messageBottom && e.content.push({
                text: r.messageBottom,
                style: "message",
                margin: [0, 0, 0, 12]
            }), r.title && e.content.unshift({
                text: r.title,
                style: "title",
                margin: [0, 0, 0, 12]
            }), a.customize && a.customize(e, a), e = (i || g.pdfMake).createPdf(e), "open" !== a.download || C() ? e.getBuffer(function(t) {
                t = new Blob([t], {
                    type: "application/pdf"
                }), D(t, r.filename), o.processing(!1)
            }) : (e.open(), this.processing(!1))
        },
        title: "*",
        filename: "*",
        extension: ".pdf",
        exportOptions: {},
        orientation: "portrait",
        pageSize: "A4",
        header: !0,
        footer: !1,
        messageTop: "*",
        messageBottom: "*",
        customize: null,
        download: "download"
    }, t.Buttons
}),
function(n) {
    "function" == typeof define && define.amd ? define(["jquery", "datatables.net", "datatables.net-buttons"], function(t) {
        return n(t, window, document)
    }) : "object" == typeof exports ? module.exports = function(t, e) {
        return t || (t = window), e && e.fn.dataTable || (e = require("datatables.net")(t, e).$), e.fn.dataTable.Buttons || require("datatables.net-buttons")(t, e), n(e, t, t.document)
    } : n(jQuery, window, document)
}(function(u, c, t) {
    var e = u.fn.dataTable,
        n = t.createElement("a"),
        d = function(t) {
            return n.href = t, -1 === (t = n.host).indexOf("/") && 0 !== n.pathname.indexOf("/") && (t += "/"), n.protocol + "//" + t + n.pathname + n.search
        };
    return e.ext.buttons.print = {
        className: "buttons-print",
        text: function(t) {
            return t.i18n("buttons.print", "Print")
        },
        action: function(t, e, n, a) {
            t = e.buttons.exportData(u.extend({
                decodeEntities: !1
            }, a.exportOptions)), n = e.buttons.exportInfo(a);
            var o = function(t, e) {
                for (var n = "<tr>", a = 0, o = t.length; a < o; a++) n += "<" + e + ">" + t[a] + "</" + e + ">";
                return n + "</tr>"
            };
            e = '<table class="' + e.table().node().className + '">';
            a.header && (e += "<thead>" + o(t.header, "th") + "</thead>");
            e += "<tbody>";
            for (var r = 0, l = t.body.length; r < l; r++) e += o(t.body[r], "td");
            e += "</tbody>", a.footer && t.footer && (e += "<tfoot>" + o(t.footer, "th") + "</tfoot>");
            e += "</table>";
            var i = c.open("", "");
            i.document.close();
            var s = "<title>" + n.title + "</title>";
            u("style, link").each(function() {
                var t = s,
                    e = u(this).clone()[0];
                "link" === e.nodeName.toLowerCase() && (e.href = d(e.href)), s = t + e.outerHTML
            });
            try {
                i.document.head.innerHTML = s
            } catch (t) {
                u(i.document.head).html(s)
            }
            i.document.body.innerHTML = "<h1>" + n.title + "</h1><div>" + (n.messageTop || "") + "</div>" + e + "<div>" + (n.messageBottom || "") + "</div>", u(i.document.body).addClass("dt-print-view"), u("img", i.document.body).each(function(t, e) {
                e.setAttribute("src", d(e.getAttribute("src")))
            }), a.customize && a.customize(i), setTimeout(function() {
                a.autoPrint && (i.print(), i.close())
            }, 1e3)
        },
        title: "*",
        messageTop: "*",
        messageBottom: "*",
        exportOptions: {},
        header: !0,
        footer: !1,
        autoPrint: !0,
        customize: null
    }, e.Buttons
});