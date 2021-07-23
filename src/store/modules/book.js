// store 文件中管理 vuex，可以理解成数据共享
/* 将数据引用的方法：
*  1、在 book.js 中注册
*  2、在 getters.js 中引用
*  3.(以前)到需要引用数据的组件使用 mapGetters 获取 state 中的数据, mapGetters 是在组件中的 computed 方法中使用
* (步骤 3 由于代码存在于各个组件之中，不方便维护，所以将 mapGetters 放置一个 utils 文件夹下的mixin.js进行管理)
*  现在数据引用的方法：
*  1、在 book.js 中state 、mutations注册
*  2、在 action.js 中注册(方法的注册)
*  3、在 getters.js 中注册(数据的注册)
*  4、在 mixin.js 中将 getters.js 和 actions.js 中注册过的数据和方法集中引入
*  5、到需要引用数据的组件引用 mixin.js 文件，再使用组件的 mixins 方法引入mixin.js 中自定义的对象
* */
/* eslint-disable */
const book = {
  state: {
    fileName: '',
    menuVisible: false,
    settingVisible: -1, // -1:不显示   0:字号(fontSize)   1:主题(fontTheme)   2:进度(progress)   3:目录
    defaultFontSize: 16,
    defaultFontFamily: 'Default',
    fontFamilyVisible: false,
    defaultTheme: 'Default',
    bookAvailable: false,
    progress: 0,
    section: 0,
    isPaginating: true,
    currentBook: null,
    navigation: null,
    cover: null,
    metadata: null,
    paginate: '',
    pagelist: null,
    offsetY: 0,
    isBookmark: null
  },
  mutations: {
    'SET_FILENAME': (state,fileName) =>
    {
      state.fileName = fileName
    },
    'SET_MENU_VISIBLE': (state,visible) =>
    {
      state.menuVisible = visible
    },
    'SET_SETTING_VISIBLE': (state,visible) =>
    {
      state.settingVisible = visible
    },
    'SET_DEFAULT_FONT_SIZE': (state,fontSize) =>
    {
      state.defaultFontSize = fontSize
    },
    'SET_DEFAULT_FONT_FAMILY': (state,font) =>
    {
      state.defaultFontFamily = font
    },
    'SET_FONT_FAMILY_VISIBLE': (state,fontFamilyVisible) =>
    {
      state.fontFamilyVisible = fontFamilyVisible
    },
    'SET_DEFAULT_THEME': (state,theme) =>
    {
      state.defaultTheme = theme
    },
    'SET_BOOK_AVAILABLE': (state,bookAvailable) =>
    {
      state.bookAvailable = bookAvailable
    },
    'SET_PROGRESS': (state,progress) =>
    {
      state.progress = progress
    },
    'SET_SECTION': (state,section) =>
    {
      state.section = section
    },
    'SET_IS_PAGINATING': (state,isPaginating) =>
    {
      state.isPaginating = isPaginating
    },
    'SET_CURRENT_BOOK': (state,currentBook) =>
    {
      state.currentBook = currentBook
    },
    'SET_NAVIGATION': (state,navigation) =>
    {
      state.navigation = navigation
    },
    'SET_COVER': (state,cover) =>
    {
      state.cover = cover
    },
    'SET_METADATA': (state,metadata) =>
    {
      state.metadata = metadata
    },
    'SET_PAGINATE': (state,paginate) =>
    {
      state.paginate = paginate
    },
    'SET_PAGELIST': (state,pagelist) =>
    {
      state.pagelist = pagelist
    },
    'SET_OFFSETY': (state,offsetY) =>
    {
      state.offsetY = offsetY
    },
    'SET_IS_BOOKMARK': (state,isBookmark) =>
    {
      state.isBookmark = isBookmark
    }
  }
}

export default book
