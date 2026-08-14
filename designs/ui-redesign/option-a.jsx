// 方案 A · Refined Glass —— 保守改良
// 信息架构与现版完全一致（头部/开关行/展开参数/底栏），只换皮肤：
// 烟灰玻璃面板、发丝分隔、图标同款"描线胶囊 + 实心发光旋钮"拨杆。
// 迁移成本最低，SwiftUI 逐项替换即可落地。

function OptARow({ sw, on, flip, expanded, onExpand, count }) {
  const { Icon } = sw;
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "8px 14px", cursor: "default" }}>
        <span className="ot-st">
          {on ? <span className="dot-on" /> : <span className="dot-off" />}
        </span>
        <Icon />
        <span style={{ fontSize: 12.5, flex: "1 1 auto", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {sw.name}
        </span>
        {on && count && <span className="ot-count">{count}</span>}
        {sw.id === "moyu" && (
          <span onClick={onExpand} style={{ cursor: "pointer", display: "flex", padding: 2 }}>
            <GChevron open={expanded} />
          </span>
        )}
        <div className={"ot-toggle " + (on ? "on" : "off")} onClick={() => flip(sw.id)}>
          <div className="knob" />
        </div>
      </div>
      {expanded && sw.id === "moyu" && <OptAParams />}
    </div>
  );
}

function OptAParams() {
  const p = OT_MOYU_PARAMS;
  const cap = { fontSize: 10.5, color: "var(--ot-txt-3)", marginBottom: 5, letterSpacing: ".02em" };
  const grp = { padding: "7px 14px 7px 37px" };
  return (
    <div style={{ background: "rgba(0,0,0,.22)", borderTop: "1px solid var(--ot-line)", borderBottom: "1px solid var(--ot-line)", paddingBottom: 6 }}>
      <div style={grp}>
        <div style={cap}>防休眠</div>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {p.awakeOptions.map((o, i) => (
            <span key={o} className={"ot-chip" + (i === p.awakeSel ? " sel" : "")}>{o}</span>
          ))}
        </div>
      </div>
      <div style={grp}>
        <div style={cap}>按键 · 敲击间隔</div>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap", alignItems: "center" }}>
          <span className="ot-field"><GKey /> {p.nudgeKey}</span>
          <span style={{ width: 6 }} />
          {p.intervalPresets.map((o, i) => (
            <span key={o} className={"ot-chip" + (i === p.intervalSel ? " sel" : "")}>{o}</span>
          ))}
          <span className="ot-field">{p.intervalValue}s</span>
        </div>
      </div>
      <div style={grp}>
        <div style={cap}>时长</div>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {p.durationPresets.map((o, i) => (
            <span key={o} className={"ot-chip" + (i === p.durationSel ? " sel" : "")}>{o}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function OptAPanel() {
  const [st, flip] = useToggles();
  const [expanded, setExpanded] = React.useState(true);
  return (
    <div className="ot-surface" style={{ width: 320, borderRadius: 22, overflow: "hidden" }}>
      {/* 头部 */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px 10px" }}>
        <GPrompt />
        <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: ".02em" }}>OpenToggle</span>
        <span style={{ flex: 1 }} />
        <span className="ot-count" style={{ opacity: .8 }}>3 ON</span>
      </div>
      <hr className="ot-hr" />
      {/* 权限横幅（黑白语言下的警示 = 反白 + 虚线框，替代旧橙色） */}
      <div style={{ margin: "10px 14px 2px", padding: "8px 11px", borderRadius: 11,
                    border: "1px dashed rgba(255,255,255,.4)", background: "rgba(255,255,255,.045)" }}>
        <div style={{ fontSize: 11.5, fontWeight: 600, display: "flex", gap: 6, alignItems: "center" }}>
          <span className="ot-st" style={{ width: "auto" }}>!</span> 需要辅助功能权限
        </div>
        <div style={{ fontSize: 10.5, color: "var(--ot-txt-2)", margin: "3px 0 6px" }}>
          发送按键的开关依赖此权限，未授权时事件会被系统丢弃。
        </div>
        <span className="ot-chip sel" style={{ fontSize: 10.5 }}>打开辅助功能设置</span>
      </div>
      {/* 开关列表 */}
      <div style={{ padding: "6px 0" }}>
        {OT_SWITCHES.map(sw => (
          <OptARow key={sw.id} sw={sw} on={st[sw.id]} flip={flip}
                   count={sw.count} expanded={expanded && sw.id === "moyu"}
                   onExpand={() => setExpanded(e => !e)} />
        ))}
      </div>
      <hr className="ot-hr" />
      {/* 底栏 */}
      <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "8px 12px" }}>
        <span className="ot-ghost"><GSliders /> 管理脚本</span>
        <span className="ot-ghost" style={{ padding: "4px 7px" }}>⟳</span>
        <span style={{ flex: 1 }} />
        <span className="ot-ghost">退出</span>
      </div>
    </div>
  );
}

// 管理器缩略：结构不变（侧栏 + 表单 + 代码区），同套玻璃皮肤
function OptAManager() {
  const side = [
    ["摸鱼模式", true], ["Keep Awake", false], ["Dark Mode", true],
    ["Mute Audio", false], ["Dock Auto-Hide", true],
  ];
  return (
    <div className="ot-surface" style={{ width: 640, borderRadius: 18, overflow: "hidden", fontSize: 11 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 14px", borderBottom: "1px solid var(--ot-line)" }}>
        <span style={{ display: "flex", gap: 5 }}>
          {[0,1,2].map(i => <i key={i} style={{ width: 10, height: 10, borderRadius: 5, border: "1px solid var(--ot-line-strong)" }} />)}
        </span>
        <span style={{ flex: 1, textAlign: "center", color: "var(--ot-txt-2)", fontSize: 11 }}>脚本管理 — OpenToggle</span>
      </div>
      <div style={{ display: "flex", minHeight: 300 }}>
        <div style={{ width: 150, borderRight: "1px solid var(--ot-line)", padding: "8px 0", background: "rgba(0,0,0,.18)" }}>
          {side.map(([n, on], i) => (
            <div key={n} style={{ display: "flex", alignItems: "center", gap: 7, padding: "6px 12px",
                                  background: i === 0 ? "rgba(255,255,255,.07)" : "none" }}>
              <span className="ot-st">{on ? <span className="dot-on" /> : <span className="dot-off" />}</span>
              <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{n}</span>
            </div>
          ))}
          <div style={{ padding: "10px 12px 2px", color: "var(--ot-txt-3)" }}>＋ 新建开关</div>
        </div>
        <div style={{ flex: 1, padding: 14 }}>
          <div style={{ fontSize: 10.5, color: "var(--ot-txt-3)", marginBottom: 5 }}>名称 · 图标 · 类型</div>
          <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
            <span className="ot-field" style={{ flex: 1 }}>摸鱼模式</span>
            <span className="ot-field"><GFish /></span>
            <span className="ot-chip sel">daemon</span>
          </div>
          <div style={{ fontSize: 10.5, color: "var(--ot-txt-3)", marginBottom: 5 }}>参数</div>
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 12 }}>
            <span className="ot-chip">awake · select</span>
            <span className="ot-chip">nudgekey · key</span>
            <span className="ot-chip">interval · number</span>
            <span className="ot-chip">duration · number</span>
          </div>
          <div style={{ borderRadius: 10, border: "1px solid var(--ot-line)", overflow: "hidden" }}>
            <div className="ot-term" style={{ padding: "8px 11px", background: "rgba(0,0,0,.4)", fontSize: 10 }}>
              <div className="dim"># &lt;switch.name&gt; 摸鱼模式</div>
              <div className="dim"># &lt;switch.type&gt; daemon</div>
              <div className="mid">ARGS="-${'{'}SWITCH_AWAKE:-d{'}'}"</div>
              <div className="mid">exec caffeinate $ARGS</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { OptAPanel, OptAManager });
