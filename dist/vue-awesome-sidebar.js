import { inject as m, unref as he, openBlock as l, createBlock as g, resolveDynamicComponent as S, createElementBlock as h, mergeProps as B, toDisplayString as J, withCtx as ce, createTextVNode as be, onBeforeUnmount as le, resolveComponent as F, normalizeClass as H, normalizeStyle as A, createCommentVNode as f, createElementVNode as T, toHandlerKey as R, Fragment as O, renderList as ne, toRefs as de, ref as y, computed as se, onMounted as ke, provide as d, watch as N, renderSlot as ie, createVNode as ye, Transition as He } from "vue";
const Oe = {
  props: ["data"]
}, Se = Object.assign(Oe, {
  __name: "HeaderItem",
  setup(e) {
    const t = m("getSlotByName")("headerItem");
    return (i, r) => {
      var s, o, u;
      return he(t) ? (l(), g(S(he(t)), {
        key: 0,
        header: e.data.header
      }, null, 8, ["header"])) : (l(), h("div", B({
        key: 1,
        class: ["vsss-header", (s = e.data) != null && s.class ? (o = e.data) == null ? void 0 : o.class : ""]
      }, (u = e.data) == null ? void 0 : u.attributes), J(e.data.header), 17));
    };
  }
}), Q = (e, n) => {
  const t = e.__vccOpts || e;
  for (const [i, r] of n)
    t[i] = r;
  return t;
}, Te = {
  name: "MenuItemIcon",
  props: {
    icon: {
      default: ""
    }
  }
};
function we(e, n, t, i, r, s) {
  var o, u, c, v;
  return l(), g(S((o = t.icon) != null && o.element ? t.icon.element : "i"), B({
    class: ["menu-icon", (u = t.icon) != null && u.class ? (c = t.icon) == null ? void 0 : c.class : ""],
    "aria-hidden": "true"
  }, (v = t.icon) == null ? void 0 : v.attributes), {
    default: ce(() => [
      be(J(t.icon.text), 1)
    ]),
    _: 1
  }, 16, ["class"]);
}
const Ae = /* @__PURE__ */ Q(Te, [["render", we]]), Re = {
  name: "menu-item",
  components: { MenuItemIconVue: Ae },
  data: () => ({
    showChildren: !1,
    expanded: !1,
    containerHeight: "0",
    hieghtTimeout: null,
    renderTimeOut: null,
    renderChildren: !1,
    cacheHieght: null,
    active: !1,
    miniActive: !1,
    hover: !1,
    ContainerOffsetY: 0,
    id: null,
    siblingsHaveIcon: !1,
    MakeSpace: !1,
    TopcontainerHiefht: "fit-content",
    labelMiniYofsset: 0,
    labelMiniYYofsset: 0,
    miniMenuOffset: 50,
    seTAnimationTimeOut: !1,
    topConTime: null
  }),
  props: [
    "smallMenu",
    "header",
    "depth",
    "siblingsHaveIconProp",
    "isParentFlat",
    "item",
    "isMakeSpace",
    "setMaxHeightTopCProp"
  ],
  setup() {
    const e = m("getSlotByName"), {
      animationDuration: n,
      menuType: t,
      widthMiniMenu: i,
      childrenOpenAnimation: r,
      removeIconSpace: s,
      vueRouterEnabel: o,
      keepChildrenOpen: u,
      checkButtonActive: c,
      ChildrenOpenActiveRoute: v,
      collapsed: a,
      closeOpenMenuOnHrefPush: b,
      position: I
    } = m("sidebarProps"), M = m("browserAgent"), k = m("currentRoute"), L = m("isSameUrl"), P = m("extractChildrenRoutes"), p = m("menuMounted"), X = m("miniMenu"), Z = m("MenuScroll"), $ = m("MenuHover"), W = m("getRandomUid"), D = m("updateCurrantItemHover"), E = m("updateCurranContainerHover"), x = m("CurrantItemHover"), w = m("menuDirection"), U = m("emitOut"), V = m("updateIsCollapsed"), z = m("routerPushBlockList"), _ = m("pushToRouterPush"), j = m("symbolId");
    let ee = e("itemApendIcon"), q = e("itemPrepandIcon"), te = e("menuItemLabel");
    return {
      animationDuration: n,
      pushToRouterPush: _,
      symbolId: j,
      routerPushBlockList: z,
      menuItemLabel: te,
      updateIsCollapsed: V,
      currentRoute: k,
      menuMounted: p,
      itemApendIcon: ee,
      itemPrepandIcon: q,
      miniMenu: X,
      MenuScroll: Z,
      MenuHover: $,
      keepChildrenOpen: u,
      ChildrenOpenActiveRoute: v,
      closeOpenMenuOnHrefPush: b,
      emitOut: U,
      menuDirection: w,
      checkButtonActive: c,
      CurrantItemHover: x,
      updateCurranContainerHover: E,
      updateCurrantItemHover: D,
      getRandomUid: W,
      vueRouterEnabel: o,
      extractChildrenRoutes: P,
      isSameUrl: L,
      menuType: t,
      widthMiniMenu: i,
      childrenOpenAnimation: r,
      removeIconSpace: s,
      collapsed: a,
      userAgentHeight: M,
      position: I
    };
  },
  watch: {
    routerPushBlockList(e) {
      if (!(!this.closeOpenMenuOnHrefPush || this.item[this.symbolId] === e) && this.item.children) {
        let i = function(r) {
          if (!n)
            for (let s = 0; s < r.length; s++) {
              if (r[s][t.symbolId] === e) {
                n = !0;
                break;
              }
              r[s].children && i(r[s].children);
            }
        }, n = !1;
        const t = this;
        i(this.item.children), n || this.closeItemChildren();
      }
    },
    currentRoute() {
      this.checkActive();
    },
    collapsed(e) {
      e && this.miniMenu && this.depth === 0 && this.closeItemChildren();
    },
    hover() {
      this.id || (this.id = this.getRandomUid()), this.hover ? (this.seTAnimationTimeOut = !0, this.updateCurrantItemHover(this.id), this.openItemCildren(), this.$nextTick(() => {
        setTimeout(() => {
          this.setItemOffsetHeight();
        }, 0);
        const e = this.$refs.labelRef.getBoundingClientRect();
        this.labelMiniYofsset = e[this.menuDirection], this.labelMiniYYofsset = e.top;
      })) : this.CurrantItemHover === this.id && this.MenuHover || this.closeItemChildren();
    },
    MenuHover() {
      this.MenuHover || this.closeItemChildren();
    },
    CurrantItemHover() {
      this.CurrantItemHover != this.id && this.closeItemChildren();
    },
    MenuScroll() {
      if (this.isMobile)
        this.closeItemChildren();
      else {
        this.setItemOffsetHeight();
        const e = this.$refs.labelRef.getBoundingClientRect();
        this.labelMiniYofsset = e[this.menuDirection], this.labelMiniYYofsset = e.top;
      }
    },
    miniMenu() {
      this.closeItemChildren(), this.$nextTick(() => {
        this.setItemOffsetHeight();
      });
    }
  },
  created() {
    this.checkActive();
  },
  mounted() {
    if (this.checkSiblingsForIcon(), this.setItemOffsetHeight(), this.position != "fixed") {
      const e = () => {
        if ("ontouchstart" in document.documentElement) {
          this.closeItemChildren();
          return;
        }
        this.setItemOffsetHeight();
        const t = this.$refs.labelRef.getBoundingClientRect();
        this.labelMiniYofsset = t[this.menuDirection], this.labelMiniYYofsset = t.top;
      }, n = () => {
        window.removeEventListener("scroll", e);
      };
      window.addEventListener("scroll", e), le(n);
    }
  },
  computed: {
    isMobile() {
      return "ontouchstart" in document.documentElement;
    },
    miniActiveClass() {
      var e, n;
      return (e = this.item) != null && e.miniActiveClass ? (n = this.item) == null ? void 0 : n.miniActiveClass : "miniActive";
    },
    activeClass() {
      var e, n;
      return (e = this.item) != null && e.activeClass ? (n = this.item) == null ? void 0 : n.activeClass : "activeClass";
    },
    menuDirectionOposite() {
      return this.menuDirection === "right" ? "left" : "right";
    },
    labelName() {
      var e, n;
      return this.miniMenu ? this.depth != 0 ? (e = this.item) == null ? void 0 : e.name : !1 : (n = this.item) == null ? void 0 : n.name;
    },
    heifOfContainer() {
      return this.containerHeight === this.userAgentHeight ? this.containerHeight : this.containerHeight + "px";
    },
    transitionTime() {
      return `all ${this.animationDuration / 1e3}s ease-in-out`;
    },
    menuItemSlotData() {
      var e, n;
      return {
        icon: { icon: ((e = this.item) == null ? void 0 : e.icon) || {}, name: (n = this.item) == null ? void 0 : n.name }
      };
    },
    shouldMouseEnterEvent() {
      return this.miniMenu && this.depth == 0 ? "mouseover" : null;
    },
    keyOrClick() {
      return this.miniMenu && this.depth == 0 ? this.expanded ? this.isMobile ? "touchend" : "click" : this.isMobile ? "" : "click" : "click";
    },
    shouldMouseLeaveEvent() {
      return this.miniMenu && this.depth == 0 ? "mouseleave" : null;
    },
    ContainerOffsetYConputed() {
      return `${this.ContainerOffsetY}px`;
    },
    menuItemClass() {
      var n, t;
      let e = {};
      return e[`vas-${this.menuType}`] = !0, e[((n = this.item) == null ? void 0 : n.class) || ""] = (t = this.item) == null ? void 0 : t.class, {
        miniCollapseIconWidth: this.miniMenu && this.depth == 0,
        MenuItemWidthOnMiniCollapse: this.miniMenu && this.depth != 0,
        menuExpanded: this.menuType === "fully" && (!this.miniMenu && this.expanded && this.depth == 0 || this.miniMenu && this.depth == 1 && this.expanded),
        noIconWidth: this.removeIconSpace && !this.miniMenu && !this.siblingsHaveIconProp && this.isParentFlat,
        noIconwidthMiniMenu: this.removeIconSpace && this.miniMenu && this.depth != 0 && !this.siblingsHaveIconProp && this.isParentFlat,
        ...e
      };
    },
    miniLabelWidth() {
      const e = Number(this.menuType != "fully");
      return this.expanded ? `calc(${this.widthMiniMenu}*${e}/2 - ${this.$refs.menuItem.clientWidth}*${e}px/2 + ${this.$refs.menuItem.clientWidth}px + 250px - 1.5px)` : "35px";
    },
    miniLabelDirection() {
      return `calc((${this.widthMiniMenu} - ${this.miniMenuOffset}px) / 2)`;
    }
  },
  methods: {
    mousewheelop(e) {
      document.querySelector(".vas-menu").scrollBy(0, e.deltaY);
    },
    PushToTopOfCallStack(e) {
      setTimeout(() => {
        e();
      }, 0);
    },
    resloveHref(e) {
      return this != null && this.$router ? this.$router.resolve(e).href : e;
    },
    checkActive() {
      var n, t, i, r;
      if (!!this.checkButtonActive)
        if (((n = this.item) == null ? void 0 : n.href) && this.isSameUrl(this.resloveHref((t = this.item) == null ? void 0 : t.href)))
          this.active = !0, this.miniActive = !1;
        else {
          if (this.active = !1, !((i = this.item) != null && i.children))
            return;
          let s = !1, o = this.extractChildrenRoutes((r = this.item) == null ? void 0 : r.children, "href") || [];
          for (var e = 0; e < o.length; e++)
            if (this.isSameUrl(this.resloveHref(o[e]))) {
              if (s = !0, this.miniActive = !0, this.menuMounted || this.miniMenu)
                break;
              this.ChildrenOpenActiveRoute && this.openItemCildren();
              break;
            }
          this.miniActive = s;
        }
    },
    labelClick() {
      this.hover ? this.miniLabelClick() : this.toggleMenu();
    },
    clickCompose() {
      var e, n, t, i;
      (e = this.item) != null && e.collapseOnClick && this.updateIsCollapsed(!0), this.emitOut("item-click", this.item), this.vueRouterEnabel && ((n = this.item) == null ? void 0 : n.href) && this.$router && (this.pushToRouterPush(this.item[this.symbolId]), (i = this.$router) == null || i.push((t = this.item) == null ? void 0 : t.href));
    },
    miniLabelClick() {
      this.clickCompose();
    },
    toggleMenu() {
      var e, n;
      this.clickCompose(), (e = this.item) != null && e.children && (clearTimeout(this.hieghtTimeout), clearTimeout(this.renderTimeOut), this.showChildren ? ((n = this.item) == null ? void 0 : n.href) && this.closeOpenMenuOnHrefPush || this.closeItemChildren() : this.openItemCildren());
    },
    setSmallMenuDataForToggle(e) {
      clearTimeout(this.topConTime), clearTimeout(this.hieghtTimeout), clearTimeout(this.renderTimeOut), this.$nextTick(() => {
        this.expanded = e;
      }), this.showChildren = e;
    },
    checkSiblingsForIcon() {
      var n, t, i, r;
      if (!(!this.removeIconSpace && this.menuType == "fully") && !!((n = this.item) != null && n.children)) {
        for (var e = 0; e < ((t = this.item) == null ? void 0 : t.children.length); e++)
          if ((r = (i = this.item) == null ? void 0 : i.children[e]) != null && r.icon) {
            this.siblingsHaveIcon = !0;
            break;
          }
      }
    },
    openItemCildren() {
      var e, n, t;
      this.depth === 1 && this.miniMenu && this.setMaxHeightTopCProp(), this.miniMenu && this.depth === 0 && (this.showChildren = !0, this.$nextTick(() => {
        this.expanded = !0;
      })), (e = this.item) != null && e.children && (this.expanded || (this.setSmallMenuDataForToggle(!0), this.renderChildren = !0, this.cacheHieght ? this.containerHeight = this.cacheHieght : this.containerHeight = this.menuMounted ? ((n = this.item) == null ? void 0 : n.children.length) * ((t = this.$refs.menuItem) == null ? void 0 : t.offsetHeight) + 3 : this.userAgentHeight, this.cacheHieght = null, this.menuMounted && (this.miniMenu && this.depth === 0 && (this.containerHeight = this.userAgentHeight), this.hieghtTimeout = setTimeout(
        () => {
          this.containerHeight = this.userAgentHeight;
        },
        this.childrenOpenAnimation ? this.animationDuration : 0
      ))));
    },
    closeItemChildren() {
      var e, n, t;
      if (this.seTAnimationTimeOut = !1, !this.menuCollapsed && this.miniMenu && this.depth === 0) {
        this.setSmallMenuDataForToggle(!1), this.topConTime = setTimeout(() => {
          this.containerHeight = 0, this.topConTime = null;
        }, this.animationDuration);
        return;
      }
      this.setSmallMenuDataForToggle(!1), (e = this.item) != null && e.children && (this.cacheHieght || (this.cacheHieght = (n = this.$refs.container) == null ? void 0 : n.offsetHeight), this.containerHeight = (t = this.$refs.container) == null ? void 0 : t.offsetHeight, this.PushToTopOfCallStack(() => {
      }), setTimeout(() => {
        this.$nextTick(() => {
          this.containerHeight = 0;
        });
      }, 10), !this.keepChildrenOpen && (this.renderTimeOut = setTimeout(
        () => {
          setTimeout(() => {
            this.renderChildren = !1;
          }, 20), this.cacheHieght = null;
        },
        this.childrenOpenAnimation ? this.animationDuration : 0
      )));
    },
    setMaxHeightTopC() {
      var n;
      const e = (n = this.$refs.topContainerRef) == null ? void 0 : n.getBoundingClientRect();
      this.MakeSpace ? this.TopcontainerHiefht = e.height + "px" : this.TopcontainerHiefht = e.height + innerHeight - (e.top + e.height) - 2 + "px";
    },
    setItemOffsetHeight() {
      var e, n, t;
      if (this.depth == 0) {
        const i = this.$refs.menuItem.getBoundingClientRect(), r = (e = this.$refs.topContainerRef) == null ? void 0 : e.getBoundingClientRect().height;
        let s = 0;
        (n = this.item) != null && n.children && (s = i.height * ((t = this.item) == null ? void 0 : t.children.length) + i.height), r && s + i.top - 15 > innerHeight ? (this.ContainerOffsetY = innerHeight - i.bottom, this.MakeSpace = !0) : (this.ContainerOffsetY = i.top, this.MakeSpace = !1), this.miniMenuOffset = i.width;
      }
    }
  }
}, Be = {
  key: 0,
  class: "BlockBack"
}, Le = {
  key: 0,
  class: "labelName"
}, Pe = { key: 1 }, De = { key: 1 }, Ee = {
  key: 0,
  class: "labelName"
}, xe = {
  key: 0,
  class: "labelminiSub"
}, Ye = {
  key: 2,
  class: "labelminiSub"
};
function Ne(e, n, t, i, r, s) {
  var c, v, a, b, I;
  const o = F("MenuItemIconVue"), u = F("menu-item", !0);
  return l(), h("div", {
    class: H([s.menuItemClass, "menu-item-base alignCenter"]),
    ref: "menuItem",
    style: A({
      float: i.miniMenu && t.depth === 1 ? i.menuDirection : s.menuDirectionOposite
    })
  }, [
    e.active ? (l(), h("div", Be)) : f("", !0),
    T("div", B({ class: "label" }, {
      [R(s.shouldMouseEnterEvent)]: n[0] || (n[0] = (M) => this.hover = !0)
    }, {
      [R(s.shouldMouseLeaveEvent)]: n[1] || (n[1] = (M) => this.hover = !1)
    }, {
      class: {
        TransitionC: !i.miniMenu || i.miniMenu && !e.showChildren,
        menuexpand: e.showChildren,
        [s.activeClass]: e.active,
        [s.miniActiveClass]: e.miniActive,
        labelHoverClass: t.depth != 0 && i.miniMenu || !i.miniMenu
      }
    }, {
      [R(s.keyOrClick)]: n[2] || (n[2] = (...M) => s.labelClick && s.labelClick(...M))
    }, {
      style: {
        [i.menuDirection == "left" ? "paddingLeft" : "paddingRight"]: i.menuType === "fully" ? `${t.depth * 18}px` : "",
        background: t.depth == 0 && !e.active && i.miniMenu ? "none" : ""
      }
    }), [
      T("div", {
        class: H(["left", { marginAuto: i.miniMenu && t.depth === 0, collapseEnd: i.miniMenu }]),
        ref: "labelRef"
      }, [
        !i.removeIconSpace || i.removeIconSpace && t.siblingsHaveIconProp ? (l(), h(O, { key: 0 }, [
          i.itemPrepandIcon ? i.itemPrepandIcon ? (l(), g(S(i.itemPrepandIcon), {
            key: 1,
            icon: (v = t.item) == null ? void 0 : v.icon,
            active: e.active,
            miniActive: e.miniActive,
            isChildrenMenuOpen: e.showChildren
          }, null, 8, ["icon", "active", "miniActive", "isChildrenMenuOpen"])) : f("", !0) : (l(), g(o, {
            key: 0,
            icon: (c = t.item) == null ? void 0 : c.icon
          }, null, 8, ["icon"]))
        ], 64)) : f("", !0),
        s.labelName ? (l(), h(O, { key: 1 }, [
          i.menuItemLabel ? (l(), g(S(i.menuItemLabel), {
            key: 1,
            labelName: s.labelName,
            active: e.active,
            miniActive: e.miniActive,
            isChildrenMenuOpen: e.showChildren
          }, null, 8, ["labelName", "active", "miniActive", "isChildrenMenuOpen"])) : (l(), h("span", Le, J(s.labelName), 1))
        ], 64)) : f("", !0)
      ], 2),
      i.miniMenu && t.depth != 0 || !i.miniMenu ? (l(), h(O, { key: 0 }, [
        t.item.children && !i.itemApendIcon ? (l(), h("div", {
          key: 0,
          class: H(["icons postIconOpenAnima", { opened: e.showChildren }])
        }, null, 2)) : f("", !0),
        t.item.children && i.itemApendIcon ? (l(), h("div", Pe, [
          i.itemApendIcon ? (l(), g(S(i.itemApendIcon), {
            key: 0,
            icon: (a = t.item) == null ? void 0 : a.icon,
            isChildrenMenuOpen: e.showChildren,
            active: e.active,
            miniActive: e.miniActive
          }, null, 8, ["icon", "isChildrenMenuOpen", "active", "miniActive"])) : f("", !0)
        ])) : f("", !0)
      ], 64)) : f("", !0)
    ], 16),
    !i.miniMenu || t.depth != 0 && i.miniMenu ? (l(), h("div", De, [
      t.item.children ? (l(), h("div", {
        key: 0,
        class: H(["items-container", { "small-menu": t.smallMenu }]),
        style: A({ maxHeight: s.heifOfContainer, transition: s.transitionTime }),
        ref: "container"
      }, [
        e.renderChildren ? (l(!0), h(O, { key: 0 }, ne(t.item.children, (M, k) => (l(), g(u, {
          siblingsHaveIconProp: e.siblingsHaveIcon,
          isParentFlat: t.siblingsHaveIconProp,
          key: k,
          item: M,
          depth: t.depth + 1,
          smallMenu: t.smallMenu
        }, null, 8, ["siblingsHaveIconProp", "isParentFlat", "item", "depth", "smallMenu"]))), 128)) : f("", !0)
      ], 6)) : f("", !0)
    ])) : f("", !0),
    i.miniMenu && t.depth === 0 && !i.collapsed ? (l(), h("div", {
      key: 2,
      class: H({ topContainer: t.depth == 0, vasopacitiy: !e.expanded }),
      ref: "topContainerRef",
      style: A({
        [e.MakeSpace ? "bottom" : "top"]: `calc(${s.ContainerOffsetYConputed} - 1px)`,
        [i.menuDirection]: `calc(${i.widthMiniMenu} - 1px)`,
        maxHeight: e.TopcontainerHiefht,
        width: e.showChildren ? "250px" : "0px",
        zIndex: e.showChildren ? "850" : "849",
        animationDelay: e.seTAnimationTimeOut ? "0.3s" : "0"
      })
    }, [
      T("div", {
        onClick: n[3] || (n[3] = (...M) => s.miniLabelClick && s.miniLabelClick(...M)),
        onMousewheel: n[4] || (n[4] = (...M) => s.mousewheelop && s.mousewheelop(...M)),
        class: H(["labelMini", {
          [s.miniActiveClass]: e.miniActive,
          [s.activeClass]: e.active
        }]),
        style: A({
          position: "fixed",
          whiteSpace: "nowrap",
          [i.menuDirection]: i.menuType === "fully" ? "0px" : s.miniLabelDirection,
          width: s.miniLabelWidth,
          [e.MakeSpace ? "bottom" : "top"]: s.ContainerOffsetYConputed,
          opacity: t.depth === 0 && e.showChildren ? "1" : "0"
        })
      }, [
        e.showChildren ? (l(), h("div", {
          key: 0,
          class: H(["left", { marginAuto: i.miniMenu && t.depth === 0 }]),
          style: A({
            [i.menuDirection]: i.widthMiniMenu,
            top: e.labelMiniYYofsset + "px"
          })
        }, [
          i.menuItemLabel ? (l(), g(S(i.menuItemLabel), {
            key: 1,
            labelName: (I = t.item) == null ? void 0 : I.name,
            active: e.active,
            miniActive: e.miniActive,
            isChildrenMenuOpen: e.showChildren
          }, null, 8, ["labelName", "active", "miniActive", "isChildrenMenuOpen"])) : (l(), h("span", Ee, J((b = t.item) == null ? void 0 : b.name), 1))
        ], 6)) : f("", !0)
      ], 38),
      t.depth == 0 && !e.MakeSpace ? (l(), h("div", xe)) : f("", !0),
      t.item.children ? (l(), h("div", {
        key: 1,
        class: H(["items-container", { "small-menu": t.smallMenu }]),
        style: A({
          maxHeight: s.heifOfContainer,
          transition: s.transitionTime
        }),
        ref: "container"
      }, [
        e.renderChildren ? (l(!0), h(O, { key: 0 }, ne(t.item.children, (M, k) => (l(), g(u, {
          siblingsHaveIconProp: e.siblingsHaveIcon,
          isParentFlat: t.siblingsHaveIconProp,
          key: k,
          item: M,
          depth: t.depth + 1,
          smallMenu: t.smallMenu,
          setMaxHeightTopCProp: s.setMaxHeightTopC,
          isMakeSpace: e.MakeSpace
        }, null, 8, ["siblingsHaveIconProp", "isParentFlat", "item", "depth", "smallMenu", "setMaxHeightTopCProp", "isMakeSpace"]))), 128)) : f("", !0)
      ], 6)) : f("", !0),
      t.depth == 0 && e.MakeSpace ? (l(), h("div", Ye)) : f("", !0)
    ], 6)) : f("", !0)
  ], 6);
}
const Fe = /* @__PURE__ */ Q(Re, [["render", Ne]]), We = {
  name: "MenuHl",
  props: {
    data: {
      default: ""
    }
  }
};
function Ue(e, n, t, i, r, s) {
  var o, u, c, v;
  return l(), g(S((o = t.data) != null && o.element ? t.data.element : "hr"), B({
    class: ["vas-hr", (u = t.data) != null && u.class ? (c = t.data) == null ? void 0 : c.class : ""]
  }, (v = t.data) == null ? void 0 : v.attributes), null, 16, ["class"]);
}
const Ve = /* @__PURE__ */ Q(We, [["render", Ue]]), ze = (e, n) => {
  const {
    menu: t,
    menuType: i,
    miniMenu: r,
    collapsed: s,
    animationDuration: o,
    width: u,
    widthMiniMenu: c,
    removeIconSpace: v,
    closeOnClickOutSide: a,
    overLayerOnOpen: b,
    childrenOpenAnimation: I,
    position: M,
    collapseBreakPoint: k,
    dark: L,
    vueRouterEnabel: P,
    keepChildrenOpen: p,
    checkButtonActive: X,
    ChildrenOpenActiveRoute: Z,
    closeOpenMenuOnHrefPush: $,
    rtl: W
  } = de(e), D = y(s.value), E = y(!1), x = y(!1), w = y(r.value), U = y(!1), V = y(null), z = y(null), _ = y(""), j = Symbol("id");
  let ee = 3;
  const q = () => ee++;
  function te(C) {
    let K = [...C];
    function ue(G) {
      for (let Y = 0; Y < G.length; Y++)
        G[Y][j] = q(), G[Y].children && ue(G[Y].children);
    }
    return ue(K), K;
  }
  function me(C) {
    _.value = C;
  }
  const oe = (C) => n.slots.hasOwnProperty(C) ? n.slots[C] : null, ae = (C) => {
    D.value = C;
  }, fe = () => {
    x.value = !x.value;
  }, ve = (C) => {
    U.value = C;
  }, Me = (C) => {
    V.value = C;
  }, Ce = (C) => {
    z.value = C;
  }, re = se(() => W.value ? "right" : "left"), pe = (C, K) => {
    n.emit(C, K);
  }, ge = (C) => {
    w.value = C;
  };
  let Ie = navigator.userAgent.indexOf("Firefox") != -1 ? "-moz-max-content" : "fit-content";
  return ke(() => {
    E.value = !0;
  }), d("sidebarProps", {
    menu: t,
    menuType: i,
    collapsed: D,
    miniMenu: w,
    animationDuration: o,
    width: u,
    widthMiniMenu: c,
    removeIconSpace: v,
    closeOnClickOutSide: a,
    overLayerOnOpen: b,
    childrenOpenAnimation: I,
    position: M,
    collapseBreakPoint: k,
    vueRouterEnabel: P,
    checkButtonActive: X,
    ChildrenOpenActiveRoute: Z,
    closeOpenMenuOnHrefPush: $,
    keepChildrenOpen: p,
    dark: L,
    rtl: W
  }), d("getSlotByName", oe), d("routerPushBlockList", _), d("pushToRouterPush", me), d("symbolId", j), d("browserAgent", Ie), d("menuMounted", E), d("miniMenu", w), d("MenuScroll", x), d("MenuHover", U), d("getRandomUid", q), d("updateCurrantItemHover", Me), d("updateCurranContainerHover", Ce), d("CurrantItemHover", V), d("CurranContainerHover", z), d("menuDirection", re), d("updateIsCollapsed", ae), d("emitOut", pe), {
    getIsCollapsed: D,
    getIsminiMenu: w,
    updateIsCollapsed: ae,
    getSlotByName: oe,
    updateminiMenu: ge,
    menuMounted: E,
    updateMenuScroll: fe,
    updateMenuHover: ve,
    menuDirection: re,
    addIdToMenuItems: te
  };
};
function _e(e, n, t) {
  if (!e)
    return;
  const i = (o) => {
    if (t.value) {
      r();
      return;
    }
    o.target == e.value || o.composedPath().includes(e.value) || n();
  }, r = () => {
    window.removeEventListener("click", i);
  }, s = () => {
    r(), setTimeout(() => {
      window.addEventListener("click", i);
    }, 0);
  };
  return le(r), { removeSideBarListner: r, addSideBarListner: s };
}
function je(e, n) {
  if (!e)
    return;
  n(e > innerWidth);
  let t = window.innerWidth;
  const i = () => {
    t != window.innerWidth && (n(e > innerWidth), t = window.innerWidth);
  };
  window.addEventListener("resize", i), le(() => {
    window.removeEventListener("resize", i);
  });
}
const qe = (e, n) => {
  de(e);
  const t = y(window.location);
  function i(o, u = t.value) {
    return u.href === u.origin + o || u.pathname + u.hash === o || u.pathname + u.search === o || u.href === o || u.hash === o;
  }
  function r(o, u) {
    if (!!o)
      return Object.entries(o).reduce(
        (c, [v, a]) => v === u ? c.concat(a) : typeof a == "object" ? c.concat(r(a, u)) : c,
        []
      );
  }
  const s = (o) => {
    t.value = { ...o };
  };
  return d("currentRoute", t), d("updateCurrentRoute", s), d("isSameUrl", i), d("extractChildrenRoutes", r), {
    isSameUrl: i,
    extractChildrenRoutes: r,
    currentRoute: t,
    updateCurrentRoute: s
  };
};
const Ke = {
  name: "vas-menu",
  props: {
    menu: {
      type: Array,
      required: !0
    },
    menuType: {
      type: String,
      default: "simple"
    },
    collapsed: {
      type: Boolean,
      default: !1
    },
    miniMenu: {
      type: Boolean,
      default: !1
    },
    animationDuration: {
      type: Number,
      default: 300
    },
    width: {
      type: String,
      default: "290px"
    },
    widthMiniMenu: {
      type: String,
      default: "65px"
    },
    autoCollapse: {
      type: Number,
      default: null
    },
    removeIconSpace: {
      type: Boolean,
      default: !1
    },
    closeOnClickOutSide: {
      type: Boolean,
      default: !1
    },
    overLayerOnOpen: {
      type: Boolean,
      default: !1
    },
    childrenOpenAnimation: {
      type: Boolean,
      default: !0
    },
    position: {
      type: String,
      default: "fixed"
    },
    keepChildrenOpen: {
      type: Boolean,
      default: !1
    },
    ChildrenOpenActiveRoute: {
      type: Boolean,
      default: !0
    },
    checkButtonActive: {
      type: Boolean,
      default: !0
    },
    vueRouterEnabel: {
      type: Boolean,
      default: !1
    },
    BottomMiniMenuBtn: {
      type: Boolean,
      default: !0
    },
    paddingTop: {
      type: String,
      default: "0px"
    },
    dark: {
      type: Boolean
    },
    rtl: {
      type: Boolean,
      default: !1
    },
    closeOpenMenuOnHrefPush: {
      type: Boolean,
      default: !1
    }
  },
  emits: {
    "item-click"(e) {
      return !!e;
    },
    "update:collapsed"(e) {
      return typeof e == "boolean";
    },
    "update:miniMenu"(e) {
      return typeof e == "boolean";
    }
  },
  data: () => ({
    smallMenu: !1,
    siblingsHaveIcon: !1
  }),
  components: {
    MenuItem: Fe,
    HeaderItem: Se,
    Menuline: Ve
  },
  mounted() {
    this.checkSiblingsForIcon(), window.addEventListener(
      "hashchange",
      () => {
        this.updateCurrentRoute(window.location);
      },
      !1
    );
  },
  watch: {
    async $route() {
      this.updateCurrentRoute(window.location);
    },
    miniMenuRef() {
      this.miniMenuRef && this.updateMenuHover(!0);
    }
  },
  computed: {
    menuScrollEvent() {
      return this.miniMenuRef ? "scroll" : null;
    },
    mouseEnterEvent() {
      return this.miniMenuRef ? "mouseenter" : null;
    },
    mouseLeaveEvent() {
      return this.miniMenuRef ? "mouseleave" : null;
    },
    computedMenuList() {
      return this.addIdToMenuItems(this.menu);
    }
  },
  methods: {
    onMenuScroll() {
      this.updateMenuScroll();
    },
    onEnter() {
      this.updateMenuHover(!0);
    },
    onLeave() {
      this.updateMenuHover(!1);
    },
    checkSiblingsForIcon() {
      var n;
      if (!(!this.removeIconSpace && this.menuType == "fully")) {
        for (var e = 0; e < this.menu.length; e++)
          if ((n = this.menu[e]) != null && n.icon) {
            this.siblingsHaveIcon = !0;
            break;
          }
      }
    },
    toggleMiniCollapse() {
      const e = !this.miniMenuRef;
      this.updateminiMenu(e), this.$emit("update:miniMenu", e);
    }
  },
  setup(e, n) {
    const {
      getIsCollapsed: t,
      getIsminiMenu: i,
      updateMenuScroll: r,
      updateMenuHover: s,
      updateminiMenu: o,
      menuDirection: u,
      updateIsCollapsed: c,
      addIdToMenuItems: v
    } = ze(e, n), { updateCurrentRoute: a } = qe(e), b = y(null), I = y(e.overLayerOnOpen), { removeSideBarListner: M, addSideBarListner: k } = _e(
      b,
      () => {
        c(!t.value);
      },
      t
    );
    e.closeOnClickOutSide && k(), N(
      () => t.value,
      (p) => {
        n.emit("update:collapsed", p), e.overLayerOnOpen && (I.value = !p), e.closeOnClickOutSide && (p ? M() : k());
      }
    ), N(
      () => e.collapsed,
      (p) => {
        c(p);
      }
    ), N(
      () => e.closeOnClickOutSide,
      (p) => {
        p ? k() : M();
      }
    ), N(
      () => e.miniMenu,
      (p) => {
        o(p);
      }
    ), N(
      () => e.overLayerOnOpen,
      (p) => {
        p ? I.value = !t.value : I.value = !1;
      }
    );
    const L = se(() => i.value ? e.widthMiniMenu : e.width), P = se(() => [
      `${e.dark ? "dark" : "white"}-theme`,
      e.rtl ? "rtl" : "ltr"
    ]);
    return je(e.autoCollapse, c), e.overLayerOnOpen && (I.value = !t.value), {
      sidebarMenuWidth: L,
      updateMenuScroll: r,
      sidebarClass: P,
      sidebarmen: b,
      updateCurrentRoute: a,
      updateMenuHover: s,
      overLayer: I,
      isCollapsed: t,
      updateminiMenu: o,
      miniMenuRef: i,
      menuDirection: u,
      addIdToMenuItems: v
    };
  }
}, Ge = { class: "vas-footer" }, Je = /* @__PURE__ */ T("div", { class: "footer-wrapper" }, null, -1), Qe = {
  key: 0,
  class: "vas-over-layer"
};
function Xe(e, n, t, i, r, s) {
  var v;
  const o = F("MenuItem"), u = F("HeaderItem"), c = F("Menuline");
  return l(), h(O, null, [
    T("nav", B({
      class: ["vas-menu", i.sidebarClass],
      ref: "sidebarmen",
      style: [{
        width: i.sidebarMenuWidth,
        position: t.position,
        [i.menuDirection]: i.isCollapsed ? `calc(-1*(${i.sidebarMenuWidth} + 2px))` : "0px",
        direction: t.rtl ? "rtl" : "ltr",
        paddingTop: t.paddingTop
      }, { overflow: "hidden" }]
    }, {
      [R(s.mouseEnterEvent)]: n[2] || (n[2] = (...a) => s.onEnter && s.onEnter(...a))
    }, {
      [R(s.mouseLeaveEvent)]: n[3] || (n[3] = (...a) => s.onLeave && s.onLeave(...a))
    }), [
      T("div", B({
        [R(s.menuScrollEvent)]: n[0] || (n[0] = (...a) => s.onMenuScroll && s.onMenuScroll(...a))
      }, {
        class: ["menu-wraper", {
          miniCoolapseMenu: i.miniMenuRef,
          compeleteCoolapseMenu: i.isCollapsed
        }],
        style: {
          width: i.sidebarMenuWidth
        }
      }), [
        ie(e.$slots, "header"),
        (l(!0), h(O, null, ne(s.computedMenuList, (a, b) => (l(), h(O, { key: b }, [
          !(a != null && a.header) && !(a != null && a.LineShow) ? (l(), g(o, {
            key: 0,
            item: a,
            depth: 0,
            smallMenu: e.smallMenu,
            siblingsHaveIconProp: e.siblingsHaveIcon
          }, null, 8, ["item", "smallMenu", "siblingsHaveIconProp"])) : (a == null ? void 0 : a.header) && !i.miniMenuRef ? (l(), g(u, {
            key: 1,
            data: a
          }, null, 8, ["data"])) : a != null && a.LineShow ? (l(), g(c, {
            key: 2,
            data: a
          }, null, 8, ["data"])) : f("", !0)
        ], 64))), 128)),
        T("div", Ge, [
          Je,
          ie(e.$slots, "footer")
        ])
      ], 16),
      t.BottomMiniMenuBtn ? (l(), h("div", {
        key: 0,
        class: "bottomBtn",
        onClick: n[1] || (n[1] = (...a) => s.toggleMiniCollapse && s.toggleMiniCollapse(...a))
      }, [
        (v = e.$slots) != null && v.BottomMiniMenuBtn ? ie(e.$slots, "BottomMiniMenuBtn", {
          key: 1,
          miniMenu: i.miniMenuRef
        }) : (l(), h("div", {
          key: 0,
          class: H(["icons bottomBtnIcon", { ssdSpin: !i.miniMenuRef }])
        }, null, 2))
      ])) : f("", !0)
    ], 16),
    ye(He, { name: "vas-fade" }, {
      default: ce(() => [
        i.overLayer ? (l(), h("div", Qe)) : f("", !0)
      ]),
      _: 1
    })
  ], 64);
}
const Ze = /* @__PURE__ */ Q(Ke, [["render", Xe]]), et = {
  install: (e) => {
    e.component("VueAwesomeSideBar", Ze);
  }
};
export {
  Ze as VueAwesomeSideBar,
  et as default
};
//# sourceMappingURL=vue-awesome-sidebar.js.map
