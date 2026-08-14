// 画布组装：设计简报 + 三方案（面板完整 + 管理器缩略）

function BriefBoard() {
  const li = { margin: "3px 0" };
  return (
    <div className="ot-surface" style={{ width: 340, borderRadius: 18, padding: 18, fontSize: 12, lineHeight: 1.75 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <GPrompt />
        <span style={{ fontWeight: 700, fontSize: 14 }}>设计简报</span>
      </div>
      <div style={{ color: "var(--ot-txt-2)", fontSize: 11.5 }}>
        延续 app 图标的黑白 liquid glass 语言重构 OpenToggle UI。设计不变量：
        <div style={li}>· <b style={{color:"var(--ot-txt)"}}>发丝描线</b>（1px 白 13–34% 透明度）承担全部结构</div>
        <div style={li}>· <b style={{color:"var(--ot-txt)"}}>实心发光白</b>是唯一的"强调色"——只给 ON 态与焦点</div>
        <div style={li}>· 烟灰玻璃三层深度：面板 / 下沉区 / 代码区</div>
        <div style={li}>· 等宽数字承载倒计时与一切"运行事实"</div>
      </div>
      <hr className="ot-hr" style={{ margin: "12px 0" }} />
      <div style={{ display: "grid", gap: 7 }}>
        <div className="ot-sw"><i style={{ background: "#0a0b0d" }} /> bg · #0A0B0D</div>
        <div className="ot-sw"><i style={{ background: "linear-gradient(150deg,#16181c,#0e1013)" }} /> glass · 烟灰渐层</div>
        <div className="ot-sw"><i style={{ border: "1px solid rgba(255,255,255,.34)", background: "transparent" }} /> hairline · 13% / 34%</div>
        <div className="ot-sw"><i style={{ background: "#fff", boxShadow: "0 0 12px rgba(255,255,255,.8)" }} /> glow white · ON / 焦点</div>
      </div>
      <hr className="ot-hr" style={{ margin: "12px 0" }} />
      <div style={{ fontSize: 11, color: "var(--ot-txt-3)" }}>
        A 保守改良 → B 层级重构 → C TUI 实验，激进程度递增；
        三案共享同一套令牌，可交叉混搭（如 A 的布局 + C 的参数区）。
      </div>
    </div>
  );
}

function App() {
  return (
    <DesignCanvas>
      <DCSection id="brief" title="OpenToggle · 黑白 Liquid Glass 重设计" subtitle="三方案对比 · 面板完整 + 管理器缩略">
        <DCArtboard id="brief" label="00 · 设计简报与令牌" width={340}>
          <BriefBoard />
        </DCArtboard>
      </DCSection>

      <DCSection id="a-full" title="✦ 方案 A 深化 · 完整设计（已选定方向）" subtitle="管理器完整三栏 · 选择器弹层 · 状态语义 · 系统菜单栏存在感">
        <DCArtboard id="a-mgr-full" label="A3 · 脚本管理器（完整三栏）" width={960}>
          <OptAFullManager />
        </DCArtboard>
        <DCArtboard id="a-states" label="A6 · 面板状态语义 + 空状态" width={320}>
          <OptAPanelStates />
        </DCArtboard>
        <DCArtboard id="a-icon" label="A4 · 图标选择器弹层" width={300}>
          <OptAIconPicker />
        </DCArtboard>
        <DCArtboard id="a-key" label="A5 · 按键选择器弹层（捕获态）" width={310}>
          <OptAKeyPicker />
        </DCArtboard>
        <DCArtboard id="a-strip" label="A7 · 系统菜单栏存在感（主图标 + add 模式图标）" width={560}>
          <OptAMenuBarStrip />
        </DCArtboard>
        <DCPostIt id="a-note">
          SwiftUI 映射：玻璃底 = .background(.ultraThinMaterial) 叠深色渐层；
          发丝线 = 0.5pt strokeBorder；发光旋钮 = shadow(color:.white.opacity(.8))；
          倒计时 = .monospacedDigit()。错误态虚线 = StrokeStyle(dash:[4,3])。
        </DCPostIt>
      </DCSection>

      <DCSection id="opt-a" title="方案 A · Refined Glass（保守改良）" subtitle="信息架构不变，整套换玻璃皮肤 —— 迁移成本最低">
        <DCArtboard id="a-panel" label="A1 · 菜单栏面板（含权限横幅 + 展开参数）" width={320}>
          <OptAPanel />
        </DCArtboard>
        <DCArtboard id="a-mgr" label="A2 · 脚本管理器缩略" width={640}>
          <OptAManager />
        </DCArtboard>
      </DCSection>

      <DCSection id="opt-b" title="方案 B · Focus Tiles（层级重构）" subtitle="运行中的开关升格为磁贴，闲置折叠 —— 突出『现在什么在跑』">
        <DCArtboard id="b-panel" label="B1 · 菜单栏面板（磁贴 + 参数抽屉 + 闲置网格）" width={330}>
          <OptBPanel />
        </DCArtboard>
        <DCArtboard id="b-mgr" label="B2 · 脚本管理器缩略（画廊卡片）" width={640}>
          <OptBManager />
        </DCArtboard>
      </DCSection>

      <DCSection id="opt-c" title="方案 C · Terminal Glass（TUI 实验）" subtitle="面板即终端：monospace、点线引导、方块光标 —— 与图标 >_ 血缘最直接">
        <DCArtboard id="c-panel" label="C1 · 菜单栏面板（终端行 + flag 参数）" width={330}>
          <OptCPanel />
        </DCArtboard>
        <DCArtboard id="c-mgr" label="C2 · 脚本管理器缩略（tmux 分屏）" width={640}>
          <OptCManager />
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
