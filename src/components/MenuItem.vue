<template>
  <div
    :class="menuItemClass"
    ref="menuItem"
    class="menu-item-base alignCenter"
    :style="{
      float: miniMenu && depth === 1 ? menuDirection : menuDirectionOposite
    }"
  >
    <div v-if="active" class="BlockBack"></div>
    <!-- ========================= -->
    <!-- ========================= -->
    <!-- 1 this is the menu label  -->
    <!-- ========================= -->
    <!-- ========================= -->

    <div
      class="label"
      @[shouldMouseEnterEvent]="this.hover = true"
      @[shouldMouseLeaveEvent]="this.hover = false"
      :class="{
        TransitionC: !miniMenu || (miniMenu && !showChildren),
        menuexpand: showChildren,
        [activeClass]: active,
        [miniActiveClass]: miniActive,
        labelHoverClass: (depth != 0 && miniMenu) || !miniMenu
      }"
      @[keyOrClick]="labelClick"
      :style="{
        [menuDirection == 'left' ? 'paddingLeft' : 'paddingRight']:
          menuType === 'fully' ? `${depth * 18}px` : ``,
        background: depth == 0 && !active && miniMenu ? 'none' : ''
      }"
    >
      <div
        class="left"
        ref="labelRef"
        :class="{ marginAuto: miniMenu && depth === 0, collapseEnd: miniMenu }"
      >
        <template
          v-if="!removeIconSpace || (removeIconSpace && siblingsHaveIconProp)"
        >
          <MenuItemIconVue v-if="!itemPrepandIcon" :icon="item?.icon" />
          <!-- !!! slot for menuitem icon-->
          <component
            v-else-if="itemPrepandIcon"
            :is="itemPrepandIcon"
            :icon="item?.icon"
            :active="active"
            :miniActive="miniActive"
            :isChildrenMenuOpen="showChildren"
          ></component>
        </template>
        <template v-if="labelName">
          <span v-if="!menuItemLabel" class="labelName">{{ labelName }}</span>
          <component
            v-else
            :labelName="labelName"
            :active="active"
            :miniActive="miniActive"
            :isChildrenMenuOpen="showChildren"
            :is="menuItemLabel"
          />
        </template>
      </div>
      <template v-if="(miniMenu && depth != 0) || !miniMenu">
        <div
          v-if="item.children && !itemApendIcon"
          class="icons postIconOpenAnima"
          :class="{ opened: showChildren }"
        ></div>
        <!-- !!!  slot for menuitem prepand icon-->
        <div v-if="item.children && itemApendIcon">
          <component
            v-if="itemApendIcon"
            :is="itemApendIcon"
            :icon="item?.icon"
            :isChildrenMenuOpen="showChildren"
            :active="active"
            :miniActive="miniActive"
          >
          </component>
        </div>
      </template>
    </div>

    <!-- ========================= -->
    <!-- ========================= -->
    <!--2 this container is for when menu Children when full width -->
    <!-- ========================= -->
    <!-- ========================= -->
    <div v-if="!miniMenu || (depth != 0 && miniMenu)">
      <div
        class="items-container"
        :class="{ 'small-menu': smallMenu }"
        :style="{ maxHeight: heifOfContainer, transition: transitionTime }"
        ref="container"
        v-if="item.children"
      >
        <template v-if="renderChildren">
          <menu-item
            v-for="(item, index) in item.children"
            :siblingsHaveIconProp="siblingsHaveIcon"
            :isParentFlat="siblingsHaveIconProp"
            :key="index"
            :item="item"
            :depth="depth + 1"
            :smallMenu="smallMenu"
          />
        </template>
      </div>
    </div>

    <!-- ========================= -->
    <!-- ========================= -->
    <!--3  this container is for mini Menu Children -->
    <!-- ========================= -->
    <!-- ========================= -->

    <div
      v-if="miniMenu && depth === 0 && !collapsed"
      :class="{ topContainer: depth == 0, vasopacitiy: !expanded }"
      ref="topContainerRef"
      :style="{
        [MakeSpace
          ? 'bottom'
          : 'top']: `calc(${ContainerOffsetYConputed} - 1px)`,
        [menuDirection]: `calc(${widthMiniMenu} - 1px)`,
        maxHeight: TopcontainerHiefht,
        width: showChildren ? '250px' : '0px',
        zIndex: showChildren ? '850' : '849',
        animationDelay: seTAnimationTimeOut ? '0.3s' : '0'
      }"
    >
      <div
        @click="miniLabelClick"
        @mousewheel="mousewheelop"
        class="labelMini"
        :class="{
          [miniActiveClass]: miniActive,
          [activeClass]: active
        }"
        :style="{
          position: 'fixed',
          whiteSpace: 'nowrap',
          [menuDirection]: menuType === 'fully' ? '0px' : miniLabelDirection,
          width: miniLabelWidth,
          [MakeSpace ? 'bottom' : 'top']: ContainerOffsetYConputed,
          opacity: depth === 0 && showChildren ? '1' : '0'
        }"
      >
        <!--main menu btn-->
        <div
          v-if="showChildren"
          class="left"
          :class="{ marginAuto: miniMenu && depth === 0 }"
          :style="{
            [menuDirection]: widthMiniMenu,
            top: labelMiniYYofsset + 'px'
          }"
        >
          <span v-if="!menuItemLabel" class="labelName">{{ item?.name }}</span>
          <component
            v-else
            :labelName="item?.name"
            :active="active"
            :miniActive="miniActive"
            :isChildrenMenuOpen="showChildren"
            :is="menuItemLabel"
          />
        </div>
      </div>
      <div class="labelminiSub" v-if="depth == 0 && !MakeSpace"></div>
      <div
        class="items-container"
        :class="{ 'small-menu': smallMenu }"
        :style="{
          maxHeight: heifOfContainer,
          transition: transitionTime
        }"
        ref="container"
        v-if="item.children"
      >
        <template v-if="renderChildren">
          <menu-item
            v-for="(item, index) in item.children"
            :siblingsHaveIconProp="siblingsHaveIcon"
            :isParentFlat="siblingsHaveIconProp"
            :key="index"
            :item="item"
            :depth="depth + 1"
            :smallMenu="smallMenu"
            :setMaxHeightTopCProp="setMaxHeightTopC"
            :isMakeSpace="MakeSpace"
          />
        </template>
      </div>
      <div class="labelminiSub" v-if="depth == 0 && MakeSpace"></div>
    </div>
  </div>
</template>

<script>
import MenuItemIconVue from './MenuItemIcon.vue'
import { inject, onBeforeUnmount } from 'vue'
export default {
  name: 'menu-item',
  components: { MenuItemIconVue },
  data: () => ({
    showChildren: false,
    expanded: false,
    containerHeight: '0',
    hieghtTimeout: null,
    renderTimeOut: null,
    renderChildren: false,
    cacheHieght: null,
    active: false,
    miniActive: false,
    hover: false,
    ContainerOffsetY: 0,
    id: null,
    siblingsHaveIcon: false,
    MakeSpace: false,
    TopcontainerHiefht: 'fit-content',
    labelMiniYofsset: 0,
    labelMiniYYofsset: 0,
    miniMenuOffset: 50,
    seTAnimationTimeOut: false,
    topConTime: null
  }),

  props: [
    'smallMenu',
    'header',
    'depth',
    'siblingsHaveIconProp',
    'isParentFlat',
    'item',
    'isMakeSpace',
    'setMaxHeightTopCProp'
  ],
  setup() {
    const getSlots = inject('getSlotByName')
    const {
      animationDuration,
      menuType,
      widthMiniMenu,
      childrenOpenAnimation,
      removeIconSpace,
      vueRouterEnabel,
      keepChildrenOpen,
      checkButtonActive,
      ChildrenOpenActiveRoute,
      collapsed,
      closeOpenMenuOnHrefPush,
      position,
      keepOneMenuOpenAtAtime
    } = inject('sidebarProps')
    const userAgentHeight = inject('browserAgent')
    const currentRoute = inject('currentRoute')
    const isSameUrl = inject('isSameUrl')
    const extractChildrenRoutes = inject('extractChildrenRoutes')
    const menuMounted = inject('menuMounted')
    const miniMenu = inject('miniMenu')
    const MenuScroll = inject('MenuScroll')
    const MenuHover = inject('MenuHover')
    const getRandomUid = inject('getRandomUid')
    const updateCurrantItemHover = inject('updateCurrantItemHover')
    const updateCurranContainerHover = inject('updateCurranContainerHover')
    const CurrantItemHover = inject('CurrantItemHover')
    const menuDirection = inject('menuDirection')
    const emitOut = inject('emitOut')
    const updateIsCollapsed = inject('updateIsCollapsed')
    const routerPushBlockList = inject('routerPushBlockList')
    const pushToRouterPush = inject('pushToRouterPush')
    const symbolId = inject('symbolId')
    let itemApendIcon = getSlots('itemApendIcon')
    let itemPrepandIcon = getSlots('itemPrepandIcon')
    let menuItemLabel = getSlots('menuItemLabel')

    return {
      animationDuration,
      pushToRouterPush,
      symbolId,
      routerPushBlockList,
      menuItemLabel,
      updateIsCollapsed,
      currentRoute,
      menuMounted,
      itemApendIcon,
      itemPrepandIcon,
      miniMenu,
      MenuScroll,
      MenuHover,
      keepChildrenOpen,
      ChildrenOpenActiveRoute,
      closeOpenMenuOnHrefPush,
      emitOut,
      menuDirection,
      checkButtonActive,
      CurrantItemHover,
      updateCurranContainerHover,
      updateCurrantItemHover,
      getRandomUid,
      vueRouterEnabel,
      extractChildrenRoutes,
      isSameUrl,
      menuType,
      widthMiniMenu,
      childrenOpenAnimation,
      removeIconSpace,
      collapsed,
      userAgentHeight,
      position,
      keepOneMenuOpenAtAtime
    }
  },
  watch: {
    routerPushBlockList(valur){
      if(!(this.keepOneMenuOpenAtAtime || this.closeOpenMenuOnHrefPush))return
      if((this.item[this.symbolId]===valur))return
      if(this.item.children){
        let isFound = false
        const self = this
        function backTrack(arr){
          if(isFound) return
          for(let i=0;i<arr.length;i++){
            if(arr[i][self.symbolId] === valur){
              isFound = true
              break;
            }
            if(arr[i].children){
              backTrack(arr[i].children)
            }
          }
        }
        backTrack(this.item.children)
        if(!isFound){
          this.closeItemChildren()
        }
      }
    },
    currentRoute() {
      this.checkActive()
    },
    collapsed(val) {
      if (val && this.miniMenu && this.depth === 0) {
        this.closeItemChildren()
      }
    },
    hover() {
      //TODO :MAKE THIS MORE EFFICEANT

      if (!this.id) {
        this.id = this.getRandomUid()
      }
      if (this.hover) {
        this.seTAnimationTimeOut = true
        this.updateCurrantItemHover(this.id)
        this.openItemCildren()
        this.$nextTick(() => {
          setTimeout(() => {
            this.setItemOffsetHeight()
          }, 0)
          const y = this.$refs['labelRef'].getBoundingClientRect()
          this.labelMiniYofsset = y[this.menuDirection]
          this.labelMiniYYofsset = y.top
        })
      } else {
        if (this.CurrantItemHover === this.id && this.MenuHover) {
        } else {
          this.closeItemChildren()
        }
      }
    },
    MenuHover() {
      if (!this.MenuHover) {
        this.closeItemChildren()
      }
    },
    CurrantItemHover() {
      //   this.miniActive =this.CurrantItemHover != this.id
      if (this.CurrantItemHover != this.id) {
        //this.miniActive = false
        this.closeItemChildren()
      } else {
        // this.miniActive = true
      }
    },
    MenuScroll() {
      if (this.isMobile) {
        this.closeItemChildren()
      } else {
        this.setItemOffsetHeight()
        const y = this.$refs['labelRef'].getBoundingClientRect()
        this.labelMiniYofsset = y[this.menuDirection]
        this.labelMiniYYofsset = y.top
      }
    },
    miniMenu() {
      this.closeItemChildren()
      this.$nextTick(() => {
        this.setItemOffsetHeight()
      })
    }
  },
  created() {
    this.checkActive()
  },
  mounted() {
    this.checkSiblingsForIcon()
    this.setItemOffsetHeight()
    if (this.position != 'fixed') {
      const listenr = () => {
        if ('ontouchstart' in document.documentElement) {
          this.closeItemChildren()
          return
        }
        this.setItemOffsetHeight()
        const y = this.$refs['labelRef'].getBoundingClientRect()
        this.labelMiniYofsset = y[this.menuDirection]
        this.labelMiniYYofsset = y.top
      }
      const removeSideBarListner = () => {
        window.removeEventListener('scroll', listenr)
      }
      window.addEventListener('scroll', listenr)
      onBeforeUnmount(removeSideBarListner)
    }
  },
  computed: {
    isMobile() {
      return 'ontouchstart' in document.documentElement
    },
    miniActiveClass() {
      return this.item?.miniActiveClass
        ? this.item?.miniActiveClass
        : 'miniActive'
    },
    activeClass() {
      return this.item?.activeClass ? this.item?.activeClass : 'activeClass'
    },
    menuDirectionOposite() {
      return this.menuDirection === 'right' ? 'left' : 'right'
    },
    labelName() {
      if (this.miniMenu) {
        return this.depth != 0 ? this.item?.name : false
      }
      return this.item?.name
    },
    heifOfContainer() {
      return this.containerHeight === this.userAgentHeight
        ? this.containerHeight
        : this.containerHeight + 'px'
    },
    transitionTime() {
      return `all ${this.animationDuration / 1000}s ease-in-out`
    },
    menuItemSlotData() {
      return {
        icon: { icon: this.item?.icon || {}, name: this.item?.name }
      }
    },
    shouldMouseEnterEvent() {
      return this.miniMenu && this.depth == 0 ? 'mouseover' : null
    },
    keyOrClick() {
      if(!this.miniMenu) return 'click'
      if(this.depth == 0){
        if(this.expanded){
          return this.isMobile ? 'touchend' : 'click'
        }
        return  this.isMobile ? '' : 'click'
      }
      return 'click'
    },
    shouldMouseLeaveEvent() {
      return this.miniMenu && this.depth == 0 ? 'mouseleave' : null
    },
    ContainerOffsetYConputed() {
      return `${this.ContainerOffsetY}px`
    },
    menuItemClass() {
      let obj = {}
      obj[`vas-${this.menuType}`] = true
      obj[this.item?.class || ''] = this.item?.class
      return {
        miniCollapseIconWidth: this.miniMenu && this.depth == 0,
        MenuItemWidthOnMiniCollapse: this.miniMenu && this.depth != 0,
        menuExpanded:
          this.menuType === 'fully' &&
          ((!this.miniMenu && this.expanded && this.depth == 0) ||
            (this.miniMenu && this.depth == 1 && this.expanded)),
        noIconWidth:
          this.removeIconSpace &&
          !this.miniMenu &&
          !this.siblingsHaveIconProp &&
          this.isParentFlat,
        noIconwidthMiniMenu:
          this.removeIconSpace &&
          this.miniMenu &&
          this.depth != 0 &&
          !this.siblingsHaveIconProp &&
          this.isParentFlat,
        ...obj
      }
      // return `menu-item-type-${this.menuType}`
    },
    miniLabelWidth() {
      const zarib = Number(this.menuType != 'fully')
      return this.expanded
        ? `calc(${this.widthMiniMenu}*${zarib}/2 - ${this.$refs['menuItem'].clientWidth}*${zarib}px/2 + ${this.$refs['menuItem'].clientWidth}px + 250px - 1.5px)`
        : `35px`
    },
    miniLabelDirection() {
      return `calc((${this.widthMiniMenu} - ${this.miniMenuOffset}px) / 2)`
    }
  },

  methods: {
    mousewheelop(w) {
      document.querySelector('.vas-menu').scrollBy(0, w.deltaY)
    },
    PushToTopOfCallStack(cb) {
      setTimeout(() => {
        cb()
      }, 0)
    },
    resloveHref(href) {
      if (this?.$router) {
        const x = this.$router.resolve(href)
        return x.href
      }
      return href
    },
    checkActive() {
      if (!this.checkButtonActive) return
      if (
        this.item?.href &&
        this.isSameUrl(this.resloveHref(this.item?.href))
      ) {
        this.active = true
        this.miniActive = false
      } else {
        this.active = false
        if (!this.item?.children) return
        let hasFound = false
        let x = this.extractChildrenRoutes(this.item?.children, 'href') || []
        for (var i = 0; i < x.length; i++) {
          if (this.isSameUrl(this.resloveHref(x[i]))) {
            hasFound = true
            // clearTimeout(this.hieghtTimeout)
            // clearTimeout(this.renderTimeOut)
            this.miniActive = true
            if (this.menuMounted || this.miniMenu) break
            if (this.ChildrenOpenActiveRoute) {
              this.openItemCildren()
            }
            break
          }
        }
        this.miniActive = hasFound
      }
    },
    labelClick() {
      if (this.hover) {
        this.miniLabelClick()
      } else {
        this.toggleMenu()
      }
    },
    clickCompose() {
      if (this.item?.collapseOnClick) {
        this.updateIsCollapsed(true)
      }
      this.emitOut('item-click', this.item)
      if ((this.vueRouterEnabel && this.item?.href && this.$router)||this.keepOneMenuOpenAtAtime){
        this.pushToRouterPush(this.item[this.symbolId])
        if(!(this.vueRouterEnabel && this.item?.href && this.$router)) return
        this.$router?.push(this.item?.href)
      }
    },
    miniLabelClick() {
      this.clickCompose()
    },
    toggleMenu() {
      this.clickCompose()
      if (!this.item?.children) return
      clearTimeout(this.hieghtTimeout)
      clearTimeout(this.renderTimeOut)
      if (this.showChildren) {
        if(!(this.item?.href && this.closeOpenMenuOnHrefPush)){
          this.closeItemChildren()
        }
      } else {
        this.openItemCildren()
      }
      // this.showChildren ? this.openItemCildren() : this.closeItemChildren()
    },
    setSmallMenuDataForToggle(val) {
      clearTimeout(this.topConTime)
      clearTimeout(this.hieghtTimeout)
      clearTimeout(this.renderTimeOut)
      this.$nextTick(() => {
        this.expanded = val
      })
      this.showChildren = val
    },
    checkSiblingsForIcon() {
      if (!this.removeIconSpace && this.menuType == 'fully') return
      if (!this.item?.children) return
      for (var i = 0; i < this.item?.children.length; i++) {
        if (this.item?.children[i]?.icon) {
          this.siblingsHaveIcon = true
          break
        }
      }
    },
    openItemCildren() {
      if (this.depth === 1 && this.miniMenu) {
        this.setMaxHeightTopCProp()
      }
      if (this.miniMenu && this.depth === 0) {
        this.showChildren = true

        this.$nextTick(() => {
          this.expanded = true
        })
      }
      if (!this.item?.children) return
      if (this.expanded) return
      this.setSmallMenuDataForToggle(true)
      this.renderChildren = true
      if (this.cacheHieght) {
        this.containerHeight = this.cacheHieght
      } else {
        this.containerHeight = this.menuMounted
          ? this.item?.children.length * this.$refs['menuItem']?.offsetHeight +
            3
          : this.userAgentHeight
      }
      this.cacheHieght = null
      //if manue is not maounted remove a
      if (!this.menuMounted) return
      if (this.miniMenu && this.depth === 0) {
        this.containerHeight = this.userAgentHeight
      }
      //add animation
      this.hieghtTimeout = setTimeout(
        () => {
          this.containerHeight = this.userAgentHeight
        },
        this.childrenOpenAnimation ? this.animationDuration : 0
      )
    },
    closeItemChildren() {
      this.seTAnimationTimeOut = false
      if (!this.menuCollapsed && this.miniMenu && this.depth === 0) {
        this.setSmallMenuDataForToggle(false)
        this.topConTime = setTimeout(() => {
          this.containerHeight = 0
          this.topConTime = null
        }, this.animationDuration)
        return
      }
      this.setSmallMenuDataForToggle(false)
      if (!this.item?.children) return
      if (!this.cacheHieght) {
        this.cacheHieght = this.$refs['container']?.offsetHeight
      }
      this.containerHeight = this.$refs['container']?.offsetHeight
      //this line must be pushed to top of call stack
      this.PushToTopOfCallStack(() => {
      })
      setTimeout(() => {
        this.$nextTick(()=>{
          this.containerHeight = 0
        })
      }, 10);
      //return if keepchildren open
      if (this.keepChildrenOpen) return
      this.renderTimeOut = setTimeout(
        () => {
          setTimeout(() => {
             this.renderChildren = false
          }, 20);
           this.cacheHieght = null
        },
        this.childrenOpenAnimation ? this.animationDuration : 0
      )
    },
    setMaxHeightTopC() {
      const x = this.$refs['topContainerRef']?.getBoundingClientRect()
      if (this.MakeSpace) {
        this.TopcontainerHiefht = x.height + 'px'
      } else {
        this.TopcontainerHiefht =
          x.height + innerHeight - (x.top + x.height) - 2 + 'px'
      }
    },
    setItemOffsetHeight() {
      if (this.depth == 0) {
        const x = this.$refs['menuItem'].getBoundingClientRect()
        const x1 = this.$refs['topContainerRef']?.getBoundingClientRect().height
        let z = 0
        if (this.item?.children) {
          z = x.height * this.item?.children.length + x.height
        }
        if (x1 && z + x.top - 15 > innerHeight) {
          this.ContainerOffsetY = innerHeight - x.bottom
          this.MakeSpace = true
        } else {
          this.ContainerOffsetY = x.top
          this.MakeSpace = false
        }
        this.miniMenuOffset = x.width
      }
    }
  }
}
</script>
