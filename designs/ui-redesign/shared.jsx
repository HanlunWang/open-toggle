// 共享：描线图标 + 真实产品 mock 数据。全部挂到 window 供各方案文件使用。

// ── 描线 SVG 图标（1.4px hairline，与整体黑白玻璃语言一致） ──────────────
function GFish() { return (
  <svg className="ot-glyph" viewBox="0 0 24 24">
    <path d="M3 12s3.5-5 9-5c4.5 0 8 3 9 5-1 2-4.5 5-9 5-5.5 0-9-5-9-5z"/>
    <path d="M3 12l-1.5-3M3 12l-1.5 3"/><circle cx="16.2" cy="10.8" r=".6" fill="currentColor"/>
  </svg> ); }
function GCup() { return (
  <svg className="ot-glyph" viewBox="0 0 24 24">
    <path d="M5 8h11v7a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8z"/>
    <path d="M16 9.5h1.6a2.4 2.4 0 0 1 0 4.8H16"/><path d="M8 5.2c0-1 .8-1 .8-2M11.5 5.2c0-1 .8-1 .8-2"/>
  </svg> ); }
function GMoon() { return (
  <svg className="ot-glyph" viewBox="0 0 24 24">
    <path d="M19 14.5A7.5 7.5 0 0 1 9.5 5 7.8 7.8 0 1 0 19 14.5z"/>
  </svg> ); }
function GSpeaker() { return (
  <svg className="ot-glyph" viewBox="0 0 24 24">
    <path d="M4 10v4h3.2L12 18V6l-4.8 4H4z"/><path d="M15.5 9.5l4.5 5M20 9.5l-4.5 5"/>
  </svg> ); }
function GDock() { return (
  <svg className="ot-glyph" viewBox="0 0 24 24">
    <rect x="3.5" y="5.5" width="17" height="13" rx="2.4"/><path d="M7 15.2h10"/>
  </svg> ); }
function GDesktop() { return (
  <svg className="ot-glyph" viewBox="0 0 24 24">
    <rect x="3.5" y="4.5" width="17" height="11.5" rx="1.8"/><path d="M9.5 20h5M12 16v4"/>
  </svg> ); }
function GGlobe() { return (
  <svg className="ot-glyph" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="8.2"/><path d="M3.8 12h16.4M12 3.8c-5.4 5-5.4 11.4 0 16.4 5.4-5 5.4-11.4 0-16.4z"/>
  </svg> ); }
function GKey() { return (
  <svg className="ot-glyph" viewBox="0 0 24 24" style={{width:13,height:13}}>
    <rect x="3.5" y="6.5" width="17" height="11" rx="2.6"/><path d="M7 14.2h10"/>
  </svg> ); }
function GGear() { return (
  <svg className="ot-glyph" viewBox="0 0 24 24" style={{width:14,height:14}}>
    <circle cx="12" cy="12" r="3"/><path d="M12 4v2.2M12 17.8V20M4 12h2.2M17.8 12H20M6.3 6.3l1.6 1.6M16.1 16.1l1.6 1.6M17.7 6.3l-1.6 1.6M7.9 16.1l-1.6 1.6"/>
  </svg> ); }
function GSliders() { return (
  <svg className="ot-glyph" viewBox="0 0 24 24" style={{width:14,height:14}}>
    <path d="M4 7.5h16M4 12h16M4 16.5h16"/>
    <circle cx="9" cy="7.5" r="1.7" fill="#0c0d10"/><circle cx="15" cy="12" r="1.7" fill="#0c0d10"/><circle cx="7" cy="16.5" r="1.7" fill="#0c0d10"/>
  </svg> ); }
function GChevron({open}) { return (
  <svg className="ot-glyph" viewBox="0 0 24 24"
       style={{width:11,height:11,opacity:.5,transform:open?"rotate(180deg)":"none",transition:"transform .18s"}}>
    <path d="M5 9l7 7 7-7"/>
  </svg> ); }
function GPrompt() { return (
  <svg className="ot-glyph" viewBox="0 0 24 24" style={{width:12,height:12}}>
    <path d="M6 5l8 7-8 7"/>
  </svg> ); }

// ── 真实产品数据（与当前 app 的开关一致） ────────────────────────────────
const OT_SWITCHES = [
  { id: "moyu",    name: "摸鱼模式",           Icon: GFish,    type: "daemon", on: true,  count: "1:23:45" },
  { id: "awake",   name: "Keep Awake",         Icon: GCup,     type: "daemon", on: false },
  { id: "dark",    name: "Dark Mode",          Icon: GMoon,    type: "toggle", on: true },
  { id: "mute",    name: "Mute Audio",         Icon: GSpeaker, type: "toggle", on: false },
  { id: "dock",    name: "Dock Auto-Hide",     Icon: GDock,    type: "toggle", on: true },
  { id: "desk",    name: "Hide Desktop Icons", Icon: GDesktop, type: "toggle", on: false },
  { id: "http",    name: "Local HTTP Server",  Icon: GGlobe,   type: "daemon", on: false },
];

// 摸鱼模式的参数（展开态展示用）
const OT_MOYU_PARAMS = {
  awakeOptions: ["仅保持屏幕", "仅保持任务", "屏幕与任务", "不启用"],
  awakeSel: 2,
  nudgeKey: "F15",
  intervalPresets: ["1分钟", "2分钟", "4分钟", "5分钟"],
  intervalSel: 2,
  intervalValue: "240",
  durationPresets: ["不限", "1小时", "2小时", "4小时", "8小时"],
  durationSel: 4,
};

// 可点开关的小状态 hook（各方案共用）
function useToggles() {
  const [state, setState] = React.useState(
    Object.fromEntries(OT_SWITCHES.map(s => [s.id, s.on]))
  );
  const flip = id => setState(p => ({ ...p, [id]: !p[id] }));
  return [state, flip];
}

Object.assign(window, {
  GFish, GCup, GMoon, GSpeaker, GDock, GDesktop, GGlobe, GKey, GGear, GSliders,
  GChevron, GPrompt, OT_SWITCHES, OT_MOYU_PARAMS, useToggles,
});
