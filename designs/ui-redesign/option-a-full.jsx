// 方案 A 深化 —— 完整设计
// A3 管理器完整三栏 / A4 图标选择器 / A5 按键选择器 / A6 面板状态集 / A7 系统菜单栏

// ── 小共享件 ─────────────────────────────────────────────────────────────
function AInfo() { // ⓘ 详解按钮
  return <span style={{ display: "inline-flex", width: 12, height: 12, borderRadius: 6,
    border: "1px solid var(--ot-txt-3)", color: "var(--ot-txt-3)", fontSize: 8.5,
    alignItems: "center", justifyContent: "center", fontFamily: "var(--ot-mono)", cursor: "help" }}>?</span>;
}
function ACap({ children }) { // 字段小标题
  return <div style={{ display: "flex", gap: 5, alignItems: "center", fontSize: 10,
    color: "var(--ot-txt-3)", marginBottom: 5, letterSpacing: ".03em" }}>{children} <AInfo /></div>;
}
function ARing() { // 窗口红绿灯（描线化）
  return <span style={{ display: "flex", gap: 5 }}>
    {[0,1,2].map(i => <i key={i} style={{ width: 10, height: 10, borderRadius: 5,
      border: "1px solid var(--ot-line-strong)" }} />)}
  </span>;
}

// ── A3 · 管理器完整 ──────────────────────────────────────────────────────
function AMgrSidebar() {
  const rows = [
    ["摸鱼模式", GFish, true,  "daemon", true,  true],
    ["Keep Awake", GCup, false, "daemon", true,  false],
    ["Dark Mode", GMoon, true,  "toggle", true,  false],
    ["Mute Audio", GSpeaker, false, "toggle", true,  false],
    ["Dock Auto-Hide", GDock, true, "toggle", true,  false],
    ["Hide Desktop Icons", GDesktop, false, "toggle", true, false],
    ["Local HTTP Server", GGlobe, false, "daemon", false, false],
  ];
  return (
    <div style={{ width: 196, borderRight: "1px solid var(--ot-line)", background: "rgba(0,0,0,.22)",
                  display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, padding: "8px 0" }}>
        {rows.map(([n, Icon, on, type, enabled, sel]) => (
          <div key={n} style={{ display: "flex", alignItems: "center", gap: 7, padding: "6.5px 12px",
                                opacity: enabled ? 1 : .4, cursor: "pointer",
                                background: sel ? "rgba(255,255,255,.08)" : "none",
                                boxShadow: sel ? "inset 2px 0 0 rgba(255,255,255,.8)" : "none" }}>
            <span className="ot-st">{on ? <span className="dot-on" /> : <span className="dot-off" />}</span>
            <Icon />
            <span style={{ flex: 1, fontSize: 11.5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{n}</span>
            <span style={{ fontSize: 8.5, fontFamily: "var(--ot-mono)", color: "var(--ot-txt-3)" }}>{type[0].toUpperCase()}</span>
            <svg className="ot-glyph" viewBox="0 0 24 24" style={{ width: 12, height: 12, opacity: .5 }}>
              {enabled
                ? <path d="M2.5 12S6 6.5 12 6.5 21.5 12 21.5 12 18 17.5 12 17.5 2.5 12 2.5 12zM12 12m-2.4 0a2.4 2.4 0 1 0 4.8 0 2.4 2.4 0 1 0-4.8 0"/>
                : <path d="M2.5 12S6 6.5 12 6.5 21.5 12 21.5 12 18 17.5 12 17.5 2.5 12 2.5 12zM4 20L20 4"/>}
            </svg>
          </div>
        ))}
      </div>
      <div style={{ borderTop: "1px solid var(--ot-line)", padding: "8px 12px",
                    display: "flex", alignItems: "center", gap: 8 }}>
        <span className="ot-ghost" style={{ padding: "3px 7px", fontSize: 11 }}>＋ 新建开关</span>
        <span style={{ flex: 1 }} />
        <span className="ot-ghost" style={{ padding: 3 }}>
          <svg className="ot-glyph" viewBox="0 0 24 24" style={{ width: 13, height: 13 }}>
            <circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c-4.4 4.6-4.4 12.4 0 17 4.4-4.6 4.4-12.4 0-17z"/>
          </svg>
        </span>
        <span className="ot-ghost" style={{ padding: 3 }}>
          <svg className="ot-glyph" viewBox="0 0 24 24" style={{ width: 13, height: 13 }}>
            <path d="M3.5 8.5v9A1.5 1.5 0 0 0 5 19h14a1.5 1.5 0 0 0 1.5-1.5V9A1.5 1.5 0 0 0 19 7.5h-7L9.8 5H5A1.5 1.5 0 0 0 3.5 6.5v2z"/>
          </svg>
        </span>
      </div>
    </div>
  );
}

function AMgrForm() {
  const grp = { border: "1px solid var(--ot-line)", borderRadius: 13, padding: "11px 13px",
                marginBottom: 11, background: "rgba(255,255,255,.02)" };
  const paramCard = { border: "1px solid var(--ot-line)", borderRadius: 10, padding: "9px 11px",
                      marginBottom: 8, background: "rgba(0,0,0,.18)" };
  return (
    <div style={{ width: 356, padding: 13, borderRight: "1px solid var(--ot-line)", fontSize: 11 }}>
      {/* 基本信息 */}
      <div style={grp}>
        <div style={{ fontSize: 11.5, fontWeight: 700, marginBottom: 9 }}>基本信息</div>
        <div style={{ display: "flex", gap: 7, marginBottom: 9 }}>
          <div style={{ flex: 1 }}>
            <ACap>名称</ACap>
            <span className="ot-field" style={{ width: "100%", boxSizing: "border-box", fontFamily: "var(--ot-sans)" }}>摸鱼模式</span>
          </div>
          <div>
            <ACap>图标</ACap>
            <span className="ot-field" style={{ padding: "3px 8px" }}><GFish /> <GChevron open={false} /></span>
          </div>
        </div>
        <ACap>类型</ACap>
        <div style={{ display: "flex", gap: 6 }}>
          <span className="ot-chip" style={{ flex: 1, justifyContent: "flex-start", padding: "6px 10px" }}>命令式 toggle</span>
          <span className="ot-chip sel" style={{ flex: 1, justifyContent: "flex-start", padding: "6px 10px" }}>常驻进程 daemon</span>
        </div>
        <div style={{ fontSize: 9.5, color: "var(--ot-txt-3)", marginTop: 6, lineHeight: 1.5 }}>
          app 启动并持有 run 进程；SIGTERM 终止；exit 0 自动复位。
        </div>
      </div>

      {/* 参数 */}
      <div style={grp}>
        <div style={{ fontSize: 11.5, fontWeight: 700, marginBottom: 9 }}>参数</div>
        <div style={paramCard}>
          <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 7 }}>
            <span className="ot-field" style={{ fontSize: 10 }}>awake</span>
            <span style={{ fontSize: 11 }}>防休眠</span>
            <span style={{ flex: 1 }} />
            <span className="ot-chip" style={{ fontSize: 9.5 }}>下拉选择</span>
            <span style={{ color: "var(--ot-txt-3)", cursor: "pointer" }}>✕</span>
          </div>
          <ACap>选项（标签=值 · | 分隔）</ACap>
          <span className="ot-field" style={{ width: "100%", boxSizing: "border-box", fontSize: 9.5 }}>
            仅保持屏幕=d|仅保持任务=is|屏幕与任务=dis|不启用=off
          </span>
        </div>
        <div style={paramCard}>
          <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 7 }}>
            <span className="ot-field" style={{ fontSize: 10 }}>nudgekey</span>
            <span style={{ fontSize: 11 }}>按键</span>
            <span style={{ flex: 1 }} />
            <span className="ot-chip" style={{ fontSize: 9.5 }}>按键</span>
            <span style={{ color: "var(--ot-txt-3)", cursor: "pointer" }}>✕</span>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
            <div>
              <ACap>默认值</ACap>
              <span className="ot-field"><GKey /> F15 <GChevron open={false} /></span>
            </div>
            <div style={{ flex: 1 }}>
              <ACap>提示</ACap>
              <span className="ot-field" style={{ width: "100%", boxSizing: "border-box", fontSize: 9.5, fontFamily: "var(--ot-sans)" }}>F15 无副作用</span>
            </div>
          </div>
        </div>
        <span className="ot-chip" style={{ borderStyle: "dashed", width: "100%", boxSizing: "border-box", padding: "5px 0" }}>＋ 添加参数</span>
      </div>

      {/* 菜单栏 */}
      <div style={{ ...grp, marginBottom: 0 }}>
        <div style={{ fontSize: 11.5, fontWeight: 700, marginBottom: 9 }}>开启时的菜单栏行为</div>
        <div style={{ display: "flex", gap: 0, border: "1px solid var(--ot-line)", borderRadius: 9, overflow: "hidden", marginBottom: 9 }}>
          {["不显示", "新增图标", "替换主图标"].map((t, i) => (
            <span key={t} style={{ flex: 1, textAlign: "center", padding: "5px 0", fontSize: 10.5, cursor: "pointer",
                                   background: i === 1 ? "rgba(255,255,255,.92)" : "transparent",
                                   color: i === 1 ? "#0c0d10" : "var(--ot-txt-2)", fontWeight: i === 1 ? 600 : 400 }}>{t}</span>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span className="ot-field"><GFish /> <GChevron open={false} /></span>
          <div className="ot-toggle on" style={{ width: 30, height: 17 }}>
            <div className="knob" style={{ width: 11, height: 11, left: 15 }} />
          </div>
          <span style={{ fontSize: 10.5, color: "var(--ot-txt-2)" }}>显示倒计时</span>
        </div>
        <div style={{ fontSize: 9.5, color: "var(--ot-txt-3)", marginTop: 6 }}>
          ✓ 倒计时读取「duration」参数（分钟；0 = 不限时）
        </div>
      </div>
    </div>
  );
}

function AMgrFilePane() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
      <div style={{ padding: "10px 13px 8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, whiteSpace: "nowrap" }}>
          <span className="ot-term mid" style={{ fontSize: 11 }}>摸鱼模式.sh</span>
          <AInfo />
        </div>
        <div style={{ display: "flex", gap: 5, marginTop: 7, flexWrap: "wrap" }}>
          <span style={{ fontSize: 8.5, color: "var(--ot-txt-3)", alignSelf: "center" }}>注入变量</span>
          {["$SWITCH_AWAKE", "$SWITCH_NUDGEKEY", "$SWITCH_INTERVAL", "$SWITCH_DURATION"].map(v => (
            <span key={v} style={{ fontSize: 8.5, fontFamily: "var(--ot-mono)", padding: "2px 6px",
                                   borderRadius: 5, border: "1px solid var(--ot-line)", color: "var(--ot-txt-3)",
                                   whiteSpace: "nowrap" }}>{v}</span>
          ))}
        </div>
      </div>
      <div className="ot-term" style={{ flex: 1, margin: "0 13px", borderRadius: 11, overflow: "hidden",
                                        border: "1px solid var(--ot-line)", fontSize: 10, display: "flex", flexDirection: "column" }}>
        {/* 契约头（自动生成 · 只读） */}
        <div style={{ padding: "9px 12px", background: "rgba(0,0,0,.42)", position: "relative" }}>
          <span style={{ position: "absolute", top: 7, right: 10, fontSize: 8.5, color: "var(--ot-txt-3)" }}>自动生成</span>
          <div className="dim"># &lt;switch.name&gt; <span className="mid">摸鱼模式</span></div>
          <div className="dim"># &lt;switch.icon&gt; <span className="mid">sf:fish.fill</span></div>
          <div className="dim"># &lt;switch.type&gt; <span className="mid">daemon</span></div>
          <div className="dim"># &lt;switch.param&gt; <span className="mid">key=awake type=select options="…"</span></div>
          <div className="dim"># &lt;switch.param&gt; <span className="mid">key=nudgekey type=key default=f15</span></div>
          <div className="dim"># &lt;switch.menubar&gt; <span className="mid">mode=add icon=sf:fish.fill countdown=on</span></div>
        </div>
        <div style={{ height: 1, background: "var(--ot-line)" }} />
        {/* 脚本体（可编辑） */}
        <div style={{ padding: "9px 12px", flex: 1, background: "rgba(0,0,0,.3)" }}>
          <div className="mid">AWAKE="${'{'}SWITCH_AWAKE:-d{'}'}"</div>
          <div className="mid">trap 'cleanup; exit 0' TERM INT</div>
          <div className="mid">if ! nudge; then exit 1; fi</div>
          <div className="mid">caffeinate "-$AWAKE" -w $$ &</div>
          <div><span className="mid">while :; do sleep "$INTERVAL" & wait $!; nudge; done</span><span className="ot-cursor" style={{ marginLeft: 5, height: 10, width: 6 }} /></div>
        </div>
      </div>
      {/* 底栏 */}
      <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "10px 13px" }}>
        <span style={{ fontSize: 10, color: "var(--ot-txt-3)" }}>● 有未保存的修改</span>
        <span style={{ flex: 1 }} />
        <span className="ot-ghost" style={{ fontSize: 10.5 }}>在 Finder 中显示</span>
        <span className="ot-chip sel" style={{ fontSize: 11, padding: "5px 14px" }}>保存修改</span>
      </div>
    </div>
  );
}

function OptAFullManager() {
  return (
    <div className="ot-surface" style={{ width: 960, borderRadius: 16, overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", padding: "10px 14px", borderBottom: "1px solid var(--ot-line)" }}>
        <ARing />
        <span style={{ flex: 1, textAlign: "center", fontSize: 11.5, color: "var(--ot-txt-2)" }}>脚本管理 — OpenToggle</span>
        <span style={{ width: 44 }} />
      </div>
      <div style={{ display: "flex", minHeight: 460 }}>
        <AMgrSidebar />
        <AMgrForm />
        <AMgrFilePane />
      </div>
    </div>
  );
}

// ── A4 · 图标选择器弹层 ──────────────────────────────────────────────────
function OptAIconPicker() {
  const glyphs = [GFish, GCup, GMoon, GSpeaker, GDock, GDesktop, GGlobe, GKey,
                  GFish, GCup, GMoon, GSpeaker, GDock, GDesktop, GGlobe, GKey];
  return (
    <div className="ot-surface" style={{ width: 300, borderRadius: 16, padding: 13 }}>
      <div style={{ display: "flex", border: "1px solid var(--ot-line)", borderRadius: 9, overflow: "hidden", marginBottom: 11 }}>
        {["Emoji", "图标", "自定义"].map((t, i) => (
          <span key={t} style={{ flex: 1, textAlign: "center", padding: "5px 0", fontSize: 10.5,
                                 background: i === 1 ? "rgba(255,255,255,.92)" : "transparent",
                                 color: i === 1 ? "#0c0d10" : "var(--ot-txt-2)", fontWeight: i === 1 ? 600 : 400 }}>{t}</span>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 6 }}>
        {glyphs.map((G, i) => (
          <span key={i} style={{ display: "flex", alignItems: "center", justifyContent: "center",
                                 height: 36, borderRadius: 9, cursor: "pointer",
                                 border: i === 0 ? "1px solid rgba(255,255,255,.7)" : "1px solid var(--ot-line)",
                                 background: i === 0 ? "rgba(255,255,255,.09)" : "rgba(255,255,255,.02)",
                                 boxShadow: i === 0 ? "0 0 10px rgba(255,255,255,.12)" : "none" }}>
            <G />
          </span>
        ))}
      </div>
      <div style={{ fontSize: 9.5, color: "var(--ot-txt-3)", marginTop: 10 }}>
        SF Symbols 精选 · 完整库可在「自定义」输入符号名
      </div>
    </div>
  );
}

// ── A5 · 按键选择器弹层 ──────────────────────────────────────────────────
function OptAKeyPicker() {
  return (
    <div className="ot-surface" style={{ width: 310, borderRadius: 16, padding: 13 }}>
      <div style={{ display: "flex", border: "1px solid var(--ot-line)", borderRadius: 9, overflow: "hidden", marginBottom: 11 }}>
        {["捕获", "常用键", "鼠标"].map((t, i) => (
          <span key={t} style={{ flex: 1, textAlign: "center", padding: "5px 0", fontSize: 10.5,
                                 background: i === 0 ? "rgba(255,255,255,.92)" : "transparent",
                                 color: i === 0 ? "#0c0d10" : "var(--ot-txt-2)", fontWeight: i === 0 ? 600 : 400 }}>{t}</span>
        ))}
      </div>
      {/* 捕获区：呼吸发光虚线框 */}
      <div style={{ borderRadius: 12, border: "1.5px dashed rgba(255,255,255,.5)", padding: "18px 12px",
                    textAlign: "center", background: "rgba(255,255,255,.045)",
                    boxShadow: "inset 0 0 24px rgba(255,255,255,.05), 0 0 14px rgba(255,255,255,.06)" }}>
        <svg className="ot-glyph" viewBox="0 0 24 24" style={{ width: 22, height: 22, margin: "0 auto 7px", display: "block" }}>
          <rect x="2.5" y="6.5" width="19" height="12" rx="2.4"/><path d="M6.5 10.5h.01M10 10.5h.01M13.5 10.5h.01M17 10.5h.01M7 14.5h10"/>
        </svg>
        <div style={{ fontSize: 10.5, color: "var(--ot-txt-2)", marginBottom: 8 }}>请按下按键…（再次点击取消）</div>
        <div style={{ fontFamily: "var(--ot-mono)", fontSize: 21, fontWeight: 700, color: "#fff",
                      textShadow: "0 0 16px rgba(255,255,255,.55)" }}>F15</div>
      </div>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 11 }}>
        {["F13", "F14", "F15", "F16", "F17", "⎋", "Space", "↩", "←", "→"].map((k, i) => (
          <span key={k} className={"ot-chip" + (k === "F15" ? " sel" : "")}
                style={{ fontFamily: "var(--ot-mono)", fontSize: 10 }}>{k}</span>
        ))}
      </div>
    </div>
  );
}

// ── A6 · 面板状态集 ──────────────────────────────────────────────────────
function StateRow({ glyph, name, note, toggleCls, dashedToggle, stEl }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "8px 14px" }}>
      <span className="ot-st">{stEl}</span>
      {glyph}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12.5 }}>{name}</div>
        {note && <div style={{ fontSize: 9.5, color: "var(--ot-txt-3)" }}>{note}</div>}
      </div>
      <div className={"ot-toggle " + toggleCls} style={dashedToggle ? { borderStyle: "dashed" } : null}>
        <div className="knob" />
      </div>
    </div>
  );
}

function OptAPanelStates() {
  return (
    <div className="ot-surface" style={{ width: 320, borderRadius: 22, overflow: "hidden", paddingBottom: 4 }}>
      <div style={{ padding: "11px 16px 7px", fontSize: 10, letterSpacing: ".12em", color: "var(--ot-txt-3)" }}>状态语义 · 全部黑白表达</div>
      <hr className="ot-hr" />
      <StateRow stEl={<span className="dot-on" />} glyph={<GFish />} name="on · 运行中"
                note="发光点 + 发光旋钮" toggleCls="on" />
      <StateRow stEl={<span className="dot-off" />} glyph={<GCup />} name="off · 已停止"
                note="空心环 + 空心旋钮" toggleCls="off" />
      <StateRow stEl={<span style={{ color: "#fff", textShadow: "0 0 8px rgba(255,255,255,.6)" }}>✕</span>}
                glyph={<GGlobe />} name="error · 异常退出"
                note="✕ 记号 + 虚线拨杆边框，hover 显示 stderr" toggleCls="off" dashedToggle />
      <StateRow stEl={<span style={{ color: "var(--ot-txt-3)" }}>?</span>}
                glyph={<GDock />} name="unknown · 状态未知"
                note="? 记号（status 非零退出）" toggleCls="off" />
      <hr className="ot-hr" style={{ margin: "4px 0" }} />
      {/* 空状态 */}
      <div style={{ padding: "16px 16px 14px", textAlign: "center" }}>
        <div style={{ fontFamily: "var(--ot-mono)", fontSize: 18, color: "var(--ot-txt-3)", marginBottom: 6 }}>&gt;_</div>
        <div style={{ fontSize: 11, color: "var(--ot-txt-2)" }}>没有找到开关脚本</div>
        <div style={{ fontSize: 10, color: "var(--ot-txt-3)", marginTop: 2, marginBottom: 9 }}>点下方「管理脚本」新建一个</div>
        <span className="ot-chip sel" style={{ fontSize: 10.5 }}>管理脚本</span>
      </div>
    </div>
  );
}

// ── A7 · 系统菜单栏存在感 ────────────────────────────────────────────────
function OptAMenuBarStrip() {
  return (
    <div style={{ width: 560 }}>
      <div className="ot-surface" style={{ borderRadius: 11, display: "flex", alignItems: "center",
                                           gap: 16, padding: "7px 16px", justifyContent: "flex-end" }}>
        <span className="ot-term mid" style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11 }}>
          <GFish /> <span className="hot">1:23:45</span>
        </span>
        <GCup />
        <span className="ot-term" style={{ fontSize: 12 }}>
          <span className="hot">&gt;</span><span className="ot-cursor" style={{ width: 6, height: 11, marginLeft: 1 }} />
        </span>
        <svg className="ot-glyph" viewBox="0 0 24 24" style={{ width: 15, height: 15 }}>
          <path d="M12 20c-2.5-2.8-4.5-5.2-4.5-8a4.5 4.5 0 0 1 9 0c0 2.8-2 5.2-4.5 8z" opacity=".0"/>
          <path d="M5 12.5a11 11 0 0 1 14 0M7.5 15a7.5 7.5 0 0 1 9 0M10 17.5a4 4 0 0 1 4 0M12 19.5v.01"/>
        </svg>
        <span style={{ fontSize: 11, color: "var(--ot-txt-2)" }}>周四 14:32</span>
      </div>
      <div style={{ fontSize: 10, color: "rgba(60,50,40,.75)", marginTop: 8, lineHeight: 1.6, fontFamily: "var(--ot-sans)" }}>
        主图标 = 会呼吸的 <b>&gt;▊</b>（有开关运行时光标常亮，全部关闭时缓慢闪烁）；
        开关声明的 mode=add 图标以模板样式渲染（🐟→描线鱼 + mono 倒计时），与系统图标视觉密度一致。
      </div>
    </div>
  );
}

Object.assign(window, { OptAFullManager, OptAIconPicker, OptAKeyPicker, OptAPanelStates, OptAMenuBarStrip });
