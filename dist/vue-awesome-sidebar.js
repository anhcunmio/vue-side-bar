import { inject as m, unref as ce, openBlock as l, createBlock as g, resolveDynamicComponent as S, createElementBlock as h, mergeProps as B, toDisplayString as J, withCtx as de, createTextVNode as be, onBeforeUnmount as oe, resolveComponent as F, normalizeClass as H, normalizeStyle as A, createCommentVNode as f, createElementVNode as T, toHandlerKey as R, Fragment as O, renderList as se, toRefs as me, ref as y, computed as le, onMounted as ye, provide as d, watch as N, renderSlot as ne, createVNode as He, Transition as Oe } from "vue";
const Se = {
  props: ["data"]
}, Te = Object.assign(Se, {
  __name: "HeaderItem",
  setup(e) {
    const t = m("getSlotByName")("headerItem");
    return (i, o) => {
      var s, a, u;
      return ce(t) ? (l(), g(S(ce(t)), {
        key: 0,
        header: e.data.header
      }, null, 8, ["header"])) : (l(), h("div", B({
        key: 1,
        class: ["vsss-header", (s = e.data) != null && s.class ? (a = e.data) == null ? void 0 : a.class : ""]
      }, (u = e.data) == null ? void 0 : u.attributes), J(e.data.header), 17));
    };
  }
}), Q = (e, n) => {
  const t = e.__vccOpts || e;
  for (const [i, o] of n)
    t[i] = o;
  return t;
}, we = {
  name: "MenuItemIcon",
  props: {
    icon: {
      default: ""
    }
  }
};
function Ae(e, n, t, i, o, s) {
  var a, u, c, v;
  return l(), g(S((a = t.icon) != null && a.element ? t.icon.element : "i"), B({
    class: ["menu-icon", (u = t.icon) != null && u.class ? (c = t.icon) == null ? void 0 : c.class : ""],
    "aria-hidden": "true"
  }, (v = t.icon) == null ? void 0 : v.attributes), {
    default: de(() => [
      be(J(t.icon.text), 1)
    ]),
    _: 1
  }, 16, ["class"]);
}
const Re = /* @__PURE__ */ Q(we, [["render", Ae]]), Be = {
  name: "menu-item",
  components: { MenuItemIconVue: Re },
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
      childrenOpenAnimation: o,
      removeIconSpace: s,
      vueRouterEnabel: a,
      keepChildrenOpen: u,
      checkButtonActive: c,
      ChildrenOpenActiveRoute: v,
      collapsed: r,
      closeOpenMenuOnHrefPush: k,
      position: I,
      keepOneMenuOpenAtAtime: M
    } = m("sidebarProps"), b = m("browserAgent"), L = m("currentRoute"), P = m("isSameUrl"), C = m("extractChildrenRoutes"), X = m("menuMounted"), Z = m("miniMenu"), $ = m("MenuScroll"), ee = m("MenuHover"), W = m("getRandomUid"), E = m("updateCurrantItemHover"), D = m("updateCurranContainerHover"), x = m("CurrantItemHover"), w = m("menuDirection"), U = m("emitOut"), V = m("updateIsCollapsed"), z = m("routerPushBlockList"), _ = m("pushToRouterPush"), j = m("symbolId");
    let te = e("itemApendIcon"), q = e("itemPrepandIcon"), ie = e("menuItemLabel");
    return {
      animationDuration: n,
      pushToRouterPush: _,
      symbolId: j,
      routerPushBlockList: z,
      menuItemLabel: ie,
      updateIsCollapsed: V,
      currentRoute: L,
      menuMounted: X,
      itemApendIcon: te,
      itemPrepandIcon: q,
      miniMenu: Z,
      MenuScroll: $,
      MenuHover: ee,
      keepChildrenOpen: u,
      ChildrenOpenActiveRoute: v,
      closeOpenMenuOnHrefPush: k,
      emitOut: U,
      menuDirection: w,
      checkButtonActive: c,
      CurrantItemHover: x,
      updateCurranContainerHover: D,
      updateCurrantItemHover: E,
      getRandomUid: W,
      vueRouterEnabel: a,
      extractChildrenRoutes: C,
      isSameUrl: P,
      menuType: t,
      widthMiniMenu: i,
      childrenOpenAnimation: o,
      removeIconSpace: s,
      collapsed: r,
      userAgentHeight: b,
      position: I,
      keepOneMenuOpenAtAtime: M
    };
  },
  watch: {
    routerPushBlockList(e) {
      if (!!(this.keepOneMenuOpenAtAtime || this.closeOpenMenuOnHrefPush) && this.item[this.symbolId] !== e && this.item.children) {
        let i = function(o) {
          if (!n)
            for (let s = 0; s < o.length; s++) {
              if (o[s][t.symbolId] === e) {
                n = !0;
                break;
              }
              o[s].children && i(o[s].children);
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
      window.addEventListener("scroll", e), oe(n);
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
      var n, t, i, o;
      if (!!this.checkButtonActive)
        if (((n = this.item) == null ? void 0 : n.href) && this.isSameUrl(this.resloveHref((t = this.item) == null ? void 0 : t.href)))
          this.active = !0, this.miniActive = !1;
        else {
          if (this.active = !1, !((i = this.item) != null && i.children))
            return;
          let s = !1, a = this.extractChildrenRoutes((o = this.item) == null ? void 0 : o.children, "href") || [];
          for (var e = 0; e < a.length; e++)
            if (this.isSameUrl(this.resloveHref(a[e]))) {
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
      var e, n, t, i, o;
      if ((e = this.item) != null && e.collapseOnClick && this.updateIsCollapsed(!0), this.emitOut("item-click", this.item), this.vueRouterEnabel && ((n = this.item) == null ? void 0 : n.href) && this.$router || this.keepOneMenuOpenAtAtime) {
        if (this.pushToRouterPush(this.item[this.symbolId]), !(this.vueRouterEnabel && ((t = this.item) == null ? void 0 : t.href) && this.$router))
          return;
        (o = this.$router) == null || o.push((i = this.item) == null ? void 0 : i.href);
      }
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
      var n, t, i, o;
      if (!(!this.removeIconSpace && this.menuType == "fully") && !!((n = this.item) != null && n.children)) {
        for (var e = 0; e < ((t = this.item) == null ? void 0 : t.children.length); e++)
          if ((o = (i = this.item) == null ? void 0 : i.children[e]) != null && o.icon) {
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
        const i = this.$refs.menuItem.getBoundingClientRect(), o = (e = this.$refs.topContainerRef) == null ? void 0 : e.getBoundingClientRect().height;
        let s = 0;
        (n = this.item) != null && n.children && (s = i.height * ((t = this.item) == null ? void 0 : t.children.length) + i.height), o && s + i.top - 15 > innerHeight ? (this.ContainerOffsetY = innerHeight - i.bottom, this.MakeSpace = !0) : (this.ContainerOffsetY = i.top, this.MakeSpace = !1), this.miniMenuOffset = i.width;
      }
    }
  }
}, Le = {
  key: 0,
  class: "BlockBack"
}, Pe = {
  key: 0,
  class: "labelName"
}, Ee = { key: 1 }, De = { key: 1 }, xe = {
  key: 0,
  class: "labelName"
}, Ye = {
  key: 0,
  class: "labelminiSub"
}, Ne = {
  key: 2,
  class: "labelminiSub"
};
function Fe(e, n, t, i, o, s) {
  var c, v, r, k, I;
  const a = F("MenuItemIconVue"), u = F("menu-item", !0);
  return l(), h("div", {
    class: H([s.menuItemClass, "menu-item-base alignCenter"]),
    ref: "menuItem",
    style: A({
      float: i.miniMenu && t.depth === 1 ? i.menuDirection : s.menuDirectionOposite
    })
  }, [
    e.active ? (l(), h("div", Le)) : f("", !0),
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
          }, null, 8, ["icon", "active", "miniActive", "isChildrenMenuOpen"])) : f("", !0) : (l(), g(a, {
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
          }, null, 8, ["labelName", "active", "miniActive", "isChildrenMenuOpen"])) : (l(), h("span", Pe, J(s.labelName), 1))
        ], 64)) : f("", !0)
      ], 2),
      i.miniMenu && t.depth != 0 || !i.miniMenu ? (l(), h(O, { key: 0 }, [
        t.item.children && !i.itemApendIcon ? (l(), h("div", {
          key: 0,
          class: H(["icons postIconOpenAnima", { opened: e.showChildren }])
        }, null, 2)) : f("", !0),
        t.item.children && i.itemApendIcon ? (l(), h("div", Ee, [
          i.itemApendIcon ? (l(), g(S(i.itemApendIcon), {
            key: 0,
            icon: (r = t.item) == null ? void 0 : r.icon,
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
        e.renderChildren ? (l(!0), h(O, { key: 0 }, se(t.item.children, (M, b) => (l(), g(u, {
          siblingsHaveIconProp: e.siblingsHaveIcon,
          isParentFlat: t.siblingsHaveIconProp,
          key: b,
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
          }, null, 8, ["labelName", "active", "miniActive", "isChildrenMenuOpen"])) : (l(), h("span", xe, J((k = t.item) == null ? void 0 : k.name), 1))
        ], 6)) : f("", !0)
      ], 38),
      t.depth == 0 && !e.MakeSpace ? (l(), h("div", Ye)) : f("", !0),
      t.item.children ? (l(), h("div", {
        key: 1,
        class: H(["items-container", { "small-menu": t.smallMenu }]),
        style: A({
          maxHeight: s.heifOfContainer,
          transition: s.transitionTime
        }),
        ref: "container"
      }, [
        e.renderChildren ? (l(!0), h(O, { key: 0 }, se(t.item.children, (M, b) => (l(), g(u, {
          siblingsHaveIconProp: e.siblingsHaveIcon,
          isParentFlat: t.siblingsHaveIconProp,
          key: b,
          item: M,
          depth: t.depth + 1,
          smallMenu: t.smallMenu,
          setMaxHeightTopCProp: s.setMaxHeightTopC,
          isMakeSpace: e.MakeSpace
        }, null, 8, ["siblingsHaveIconProp", "isParentFlat", "item", "depth", "smallMenu", "setMaxHeightTopCProp", "isMakeSpace"]))), 128)) : f("", !0)
      ], 6)) : f("", !0),
      t.depth == 0 && e.MakeSpace ? (l(), h("div", Ne)) : f("", !0)
    ], 6)) : f("", !0)
  ], 6);
}
const We = /* @__PURE__ */ Q(Be, [["render", Fe]]), Ue = {
  name: "MenuHl",
  props: {
    data: {
      default: ""
    }
  }
};
function Ve(e, n, t, i, o, s) {
  var a, u, c, v;
  return l(), g(S((a = t.data) != null && a.element ? t.data.element : "hr"), B({
    class: ["vas-hr", (u = t.data) != null && u.class ? (c = t.data) == null ? void 0 : c.class : ""]
  }, (v = t.data) == null ? void 0 : v.attributes), null, 16, ["class"]);
}
const ze = /* @__PURE__ */ Q(Ue, [["render", Ve]]), _e = (e, n) => {
  const {
    menu: t,
    menuType: i,
    miniMenu: o,
    collapsed: s,
    animationDuration: a,
    width: u,
    widthMiniMenu: c,
    removeIconSpace: v,
    closeOnClickOutSide: r,
    overLayerOnOpen: k,
    childrenOpenAnimation: I,
    position: M,
    collapseBreakPoint: b,
    dark: L,
    vueRouterEnabel: P,
    keepChildrenOpen: C,
    checkButtonActive: X,
    ChildrenOpenActiveRoute: Z,
    closeOpenMenuOnHrefPush: $,
    keepOneMenuOpenAtAtime: ee,
    rtl: W
  } = me(e), E = y(s.value), D = y(!1), x = y(!1), w = y(o.value), U = y(!1), V = y(null), z = y(null), _ = y(""), j = Symbol("id");
  let te = 3;
  const q = () => te++;
  function ie(p) {
    let K = [...p];
    function he(G) {
      for (let Y = 0; Y < G.length; Y++)
        G[Y][j] = q(), G[Y].children && he(G[Y].children);
    }
    return he(K), K;
  }
  function fe(p) {
    _.value = p;
  }
  const ae = (p) => n.slots.hasOwnProperty(p) ? n.slots[p] : null, re = (p) => {
    E.value = p;
  }, ve = () => {
    x.value = !x.value;
  }, Me = (p) => {
    U.value = p;
  }, pe = (p) => {
    V.value = p;
  }, Ce = (p) => {
    z.value = p;
  }, ue = le(() => W.value ? "right" : "left"), ge = (p, K) => {
    n.emit(p, K);
  }, Ie = (p) => {
    w.value = p;
  };
  let ke = navigator.userAgent.indexOf("Firefox") != -1 ? "-moz-max-content" : "fit-content";
  return ye(() => {
    D.value = !0;
  }), d("sidebarProps", {
    menu: t,
    menuType: i,
    collapsed: E,
    miniMenu: w,
    animationDuration: a,
    width: u,
    widthMiniMenu: c,
    removeIconSpace: v,
    closeOnClickOutSide: r,
    overLayerOnOpen: k,
    childrenOpenAnimation: I,
    position: M,
    collapseBreakPoint: b,
    vueRouterEnabel: P,
    checkButtonActive: X,
    ChildrenOpenActiveRoute: Z,
    closeOpenMenuOnHrefPush: $,
    keepChildrenOpen: C,
    dark: L,
    rtl: W,
    keepOneMenuOpenAtAtime: ee
  }), d("getSlotByName", ae), d("routerPushBlockList", _), d("pushToRouterPush", fe), d("symbolId", j), d("browserAgent", ke), d("menuMounted", D), d("miniMenu", w), d("MenuScroll", x), d("MenuHover", U), d("getRandomUid", q), d("updateCurrantItemHover", pe), d("updateCurranContainerHover", Ce), d("CurrantItemHover", V), d("CurranContainerHover", z), d("menuDirection", ue), d("updateIsCollapsed", re), d("emitOut", ge), {
    getIsCollapsed: E,
    getIsminiMenu: w,
    updateIsCollapsed: re,
    getSlotByName: ae,
    updateminiMenu: Ie,
    menuMounted: D,
    updateMenuScroll: ve,
    updateMenuHover: Me,
    menuDirection: ue,
    addIdToMenuItems: ie
  };
};
function je(e, n, t) {
  if (!e)
    return;
  const i = (a) => {
    if (t.value) {
      o();
      return;
    }
    a.target == e.value || a.composedPath().includes(e.value) || n();
  }, o = () => {
    window.removeEventListener("click", i);
  }, s = () => {
    o(), setTimeout(() => {
      window.addEventListener("click", i);
    }, 0);
  };
  return oe(o), { removeSideBarListner: o, addSideBarListner: s };
}
function qe(e, n) {
  if (!e)
    return;
  n(e > innerWidth);
  let t = window.innerWidth;
  const i = () => {
    t != window.innerWidth && (n(e > innerWidth), t = window.innerWidth);
  };
  window.addEventListener("resize", i), oe(() => {
    window.removeEventListener("resize", i);
  });
}
const Ke = (e, n) => {
  me(e);
  const t = y(window.location);
  function i(a, u = t.value) {
    return u.href === u.origin + a || u.pathname + u.hash === a || u.pathname + u.search === a || u.href === a || u.hash === a;
  }
  function o(a, u) {
    if (!!a)
      return Object.entries(a).reduce(
        (c, [v, r]) => v === u ? c.concat(r) : typeof r == "object" ? c.concat(o(r, u)) : c,
        []
      );
  }
  const s = (a) => {
    t.value = { ...a };
  };
  return d("currentRoute", t), d("updateCurrentRoute", s), d("isSameUrl", i), d("extractChildrenRoutes", o), {
    isSameUrl: i,
    extractChildrenRoutes: o,
    currentRoute: t,
    updateCurrentRoute: s
  };
};
const Ge = {
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
    },
    keepOneMenuOpenAtAtime: {
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
    MenuItem: We,
    HeaderItem: Te,
    Menuline: ze
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
      updateMenuScroll: o,
      updateMenuHover: s,
      updateminiMenu: a,
      menuDirection: u,
      updateIsCollapsed: c,
      addIdToMenuItems: v
    } = _e(e, n), { updateCurrentRoute: r } = Ke(e), k = y(null), I = y(e.overLayerOnOpen), { removeSideBarListner: M, addSideBarListner: b } = je(
      k,
      () => {
        c(!t.value);
      },
      t
    );
    e.closeOnClickOutSide && b(), N(
      () => t.value,
      (C) => {
        n.emit("update:collapsed", C), e.overLayerOnOpen && (I.value = !C), e.closeOnClickOutSide && (C ? M() : b());
      }
    ), N(
      () => e.collapsed,
      (C) => {
        c(C);
      }
    ), N(
      () => e.closeOnClickOutSide,
      (C) => {
        C ? b() : M();
      }
    ), N(
      () => e.miniMenu,
      (C) => {
        a(C);
      }
    ), N(
      () => e.overLayerOnOpen,
      (C) => {
        C ? I.value = !t.value : I.value = !1;
      }
    );
    const L = le(() => i.value ? e.widthMiniMenu : e.width), P = le(() => [
      `${e.dark ? "dark" : "white"}-theme`,
      e.rtl ? "rtl" : "ltr"
    ]);
    return qe(e.autoCollapse, c), e.overLayerOnOpen && (I.value = !t.value), {
      sidebarMenuWidth: L,
      updateMenuScroll: o,
      sidebarClass: P,
      sidebarmen: k,
      updateCurrentRoute: r,
      updateMenuHover: s,
      overLayer: I,
      isCollapsed: t,
      updateminiMenu: a,
      miniMenuRef: i,
      menuDirection: u,
      addIdToMenuItems: v
    };
  }
}, Je = { class: "vas-footer" }, Qe = /* @__PURE__ */ T("div", { class: "footer-wrapper" }, null, -1), Xe = {
  key: 0,
  class: "vas-over-layer"
};
function Ze(e, n, t, i, o, s) {
  var v;
  const a = F("MenuItem"), u = F("HeaderItem"), c = F("Menuline");
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
      [R(s.mouseEnterEvent)]: n[2] || (n[2] = (...r) => s.onEnter && s.onEnter(...r))
    }, {
      [R(s.mouseLeaveEvent)]: n[3] || (n[3] = (...r) => s.onLeave && s.onLeave(...r))
    }), [
      T("div", B({
        [R(s.menuScrollEvent)]: n[0] || (n[0] = (...r) => s.onMenuScroll && s.onMenuScroll(...r))
      }, {
        class: ["menu-wraper", {
          miniCoolapseMenu: i.miniMenuRef,
          compeleteCoolapseMenu: i.isCollapsed
        }],
        style: {
          width: i.sidebarMenuWidth
        }
      }), [
        ne(e.$slots, "header"),
        (l(!0), h(O, null, se(s.computedMenuList, (r, k) => (l(), h(O, { key: k }, [
          !(r != null && r.header) && !(r != null && r.LineShow) ? (l(), g(a, {
            key: 0,
            item: r,
            depth: 0,
            smallMenu: e.smallMenu,
            siblingsHaveIconProp: e.siblingsHaveIcon
          }, null, 8, ["item", "smallMenu", "siblingsHaveIconProp"])) : (r == null ? void 0 : r.header) && !i.miniMenuRef ? (l(), g(u, {
            key: 1,
            data: r
          }, null, 8, ["data"])) : r != null && r.LineShow ? (l(), g(c, {
            key: 2,
            data: r
          }, null, 8, ["data"])) : f("", !0)
        ], 64))), 128)),
        T("div", Je, [
          Qe,
          ne(e.$slots, "footer")
        ])
      ], 16),
      t.BottomMiniMenuBtn ? (l(), h("div", {
        key: 0,
        class: "bottomBtn",
        onClick: n[1] || (n[1] = (...r) => s.toggleMiniCollapse && s.toggleMiniCollapse(...r))
      }, [
        (v = e.$slots) != null && v.BottomMiniMenuBtn ? ne(e.$slots, "BottomMiniMenuBtn", {
          key: 1,
          miniMenu: i.miniMenuRef
        }) : (l(), h("div", {
          key: 0,
          class: H(["icons bottomBtnIcon", { ssdSpin: !i.miniMenuRef }])
        }, null, 2))
      ])) : f("", !0)
    ], 16),
    He(Oe, { name: "vas-fade" }, {
      default: de(() => [
        i.overLayer ? (l(), h("div", Xe)) : f("", !0)
      ]),
      _: 1
    })
  ], 64);
}
const $e = /* @__PURE__ */ Q(Ge, [["render", Ze]]), tt = {
  install: (e) => {
    e.component("VueAwesomeSideBar", $e);
  }
};
export {
  $e as VueAwesomeSideBar,
  tt as default
};
//# sourceMappingURL=vue-awesome-sidebar.js.map
