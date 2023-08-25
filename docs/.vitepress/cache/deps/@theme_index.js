import {
  useMediaQuery
} from "./chunk-5MZVIMFM.js";
import {
  computed,
  ref
} from "./chunk-DJKME34S.js";

// ../../node_modules/vitepress/dist/client/theme-default/index.js
import "/Users/pratikpatel/node_modules/vitepress/dist/client/theme-default/styles/fonts.css";

// ../../node_modules/vitepress/dist/client/theme-default/without-fonts.js
import "/Users/pratikpatel/node_modules/vitepress/dist/client/theme-default/styles/vars.css";
import "/Users/pratikpatel/node_modules/vitepress/dist/client/theme-default/styles/base.css";
import "/Users/pratikpatel/node_modules/vitepress/dist/client/theme-default/styles/utils.css";
import "/Users/pratikpatel/node_modules/vitepress/dist/client/theme-default/styles/components/custom-block.css";
import "/Users/pratikpatel/node_modules/vitepress/dist/client/theme-default/styles/components/vp-code.css";
import "/Users/pratikpatel/node_modules/vitepress/dist/client/theme-default/styles/components/vp-code-group.css";
import "/Users/pratikpatel/node_modules/vitepress/dist/client/theme-default/styles/components/vp-doc.css";
import "/Users/pratikpatel/node_modules/vitepress/dist/client/theme-default/styles/components/vp-sponsor.css";
import VPBadge from "/Users/pratikpatel/node_modules/vitepress/dist/client/theme-default/components/VPBadge.vue";
import Layout from "/Users/pratikpatel/node_modules/vitepress/dist/client/theme-default/Layout.vue";
import { default as default2 } from "/Users/pratikpatel/node_modules/vitepress/dist/client/theme-default/components/VPHomeHero.vue";
import { default as default3 } from "/Users/pratikpatel/node_modules/vitepress/dist/client/theme-default/components/VPHomeFeatures.vue";
import { default as default4 } from "/Users/pratikpatel/node_modules/vitepress/dist/client/theme-default/components/VPHomeSponsors.vue";
import { default as default5 } from "/Users/pratikpatel/node_modules/vitepress/dist/client/theme-default/components/VPDocAsideSponsors.vue";
import { default as default6 } from "/Users/pratikpatel/node_modules/vitepress/dist/client/theme-default/components/VPTeamPage.vue";
import { default as default7 } from "/Users/pratikpatel/node_modules/vitepress/dist/client/theme-default/components/VPTeamPageTitle.vue";
import { default as default8 } from "/Users/pratikpatel/node_modules/vitepress/dist/client/theme-default/components/VPTeamPageSection.vue";
import { default as default9 } from "/Users/pratikpatel/node_modules/vitepress/dist/client/theme-default/components/VPTeamMembers.vue";

// ../../node_modules/vitepress/dist/client/theme-default/composables/sidebar.js
import { useRoute } from "vitepress";

// ../../node_modules/vitepress/dist/client/theme-default/support/utils.js
import { withBase } from "vitepress";

// ../../node_modules/vitepress/dist/client/theme-default/composables/data.js
import { useData as useData$ } from "vitepress";
var useData = useData$;

// ../../node_modules/vitepress/dist/client/theme-default/support/utils.js
function ensureStartingSlash(path) {
  return /^\//.test(path) ? path : `/${path}`;
}

// ../../node_modules/vitepress/dist/client/theme-default/support/sidebar.js
function getSidebar(sidebar, path) {
  if (Array.isArray(sidebar)) {
    return sidebar;
  }
  if (sidebar == null) {
    return [];
  }
  path = ensureStartingSlash(path);
  const dir = Object.keys(sidebar).sort((a, b) => {
    return b.split("/").length - a.split("/").length;
  }).find((dir2) => {
    return path.startsWith(ensureStartingSlash(dir2));
  });
  return dir ? sidebar[dir] : [];
}
function getSidebarGroups(sidebar) {
  const groups = [];
  let lastGroupIndex = 0;
  for (const index in sidebar) {
    const item = sidebar[index];
    if (item.items) {
      lastGroupIndex = groups.push(item);
      continue;
    }
    if (!groups[lastGroupIndex]) {
      groups.push({ items: [] });
    }
    groups[lastGroupIndex].items.push(item);
  }
  return groups;
}

// ../../node_modules/vitepress/dist/client/theme-default/composables/sidebar.js
function useSidebar() {
  const route = useRoute();
  const { theme: theme2, frontmatter } = useData();
  const is960 = useMediaQuery("(min-width: 960px)");
  const isOpen = ref(false);
  const sidebar = computed(() => {
    const sidebarConfig = theme2.value.sidebar;
    const relativePath = route.data.relativePath;
    return sidebarConfig ? getSidebar(sidebarConfig, relativePath) : [];
  });
  const hasSidebar = computed(() => {
    return frontmatter.value.sidebar !== false && sidebar.value.length > 0 && frontmatter.value.layout !== "home";
  });
  const leftAside = computed(() => {
    if (hasAside)
      return frontmatter.value.aside == null ? theme2.value.aside === "left" : frontmatter.value.aside === "left";
    return false;
  });
  const hasAside = computed(() => {
    if (frontmatter.value.layout === "home")
      return false;
    if (frontmatter.value.aside != null)
      return !!frontmatter.value.aside;
    return theme2.value.aside !== false;
  });
  const isSidebarEnabled = computed(() => hasSidebar.value && is960.value);
  const sidebarGroups = computed(() => {
    return hasSidebar.value ? getSidebarGroups(sidebar.value) : [];
  });
  function open() {
    isOpen.value = true;
  }
  function close() {
    isOpen.value = false;
  }
  function toggle() {
    isOpen.value ? close() : open();
  }
  return {
    isOpen,
    sidebar,
    sidebarGroups,
    hasSidebar,
    hasAside,
    leftAside,
    isSidebarEnabled,
    open,
    close,
    toggle
  };
}

// ../../node_modules/vitepress/dist/client/theme-default/without-fonts.js
var theme = {
  Layout,
  enhanceApp: ({ app }) => {
    app.component("Badge", VPBadge);
  }
};
var without_fonts_default = theme;
export {
  default5 as VPDocAsideSponsors,
  default3 as VPHomeFeatures,
  default2 as VPHomeHero,
  default4 as VPHomeSponsors,
  default9 as VPTeamMembers,
  default6 as VPTeamPage,
  default8 as VPTeamPageSection,
  default7 as VPTeamPageTitle,
  without_fonts_default as default,
  useSidebar
};
//# sourceMappingURL=@theme_index.js.map
