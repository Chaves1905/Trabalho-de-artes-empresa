import { useMemo, useState } from 'react'
import { Glasses } from './components/Glasses'
import { CartProvider, useCart } from './context/CartContext'
import { AI_PACKS, FEATURES, FRAME_COLORS, LENSES, PRODUCTS } from './data'
import { brl } from './lib/money'
import type { AiPack, CheckoutData, FrameColor, LensOption, Product } from './types'

type View = 'home' | 'checkout' | 'success'

export default function App() {
  return (
    <CartProvider>
      <Store />
    </CartProvider>
  )
}

function Store() {
  const cart = useCart()
  const [view, setView] = useState<View>('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [toast, setToast] = useState('')
  const [product, setProduct] = useState<Product>(PRODUCTS[0])
  const [frame, setFrame] = useState<FrameColor>(FRAME_COLORS[0])
  const [lens, setLens] = useState<LensOption>(LENSES[0])
  const [pack, setPack] = useState<AiPack>(AI_PACKS[1])
  const [qty, setQty] = useState(1)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [orderId, setOrderId] = useState('')

  const unit = product.price + lens.price + pack.price

  function notify(message: string) {
    setToast(message)
    window.setTimeout(() => setToast(''), 2400)
  }

  function addToCart() {
    cart.addItem({ product, frameColor: frame, lens, aiPack: pack, quantity: qty })
    notify(`${product.name} adicionado ao carrinho`)
    setCartOpen(true)
  }

  function goHome() {
    setView('home')
    setMenuOpen(false)
  }

  return (
    <div className="app">
      <div className="bg-layer" aria-hidden>
        <div className="grid-overlay" />
        <div className="orb a" />
        <div className="orb b" />
        <div className="scanlines" />
      </div>

      <header className="nav">
        <button className="brand linkish" onClick={goHome} aria-label="Visora início">
          <img src="/logo.jpg" alt="" />
          <span>
            <span className="brand-name">VISORA</span>
            <span className="brand-sub mono">Óculos inteligentes</span>
          </span>
        </button>

        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <a href="#ia" onClick={() => setMenuOpen(false)}>
            Plataforma
          </a>
          <a href="#modelos" onClick={() => setMenuOpen(false)}>
            Modelos
          </a>
          <a href="#encomendar" onClick={() => setMenuOpen(false)}>
            Encomendar
          </a>
        </nav>

        <div className="nav-actions">
          <a
            className="icon-btn"
            href="https://github.com/Chaves1905"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub de Chaves"
          >
            <GithubIcon />
          </a>
          <button className="icon-btn menu-btn" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
            ☰
          </button>
          <button className="icon-btn" onClick={() => setCartOpen(true)} aria-label="Abrir carrinho">
            <CartIcon />
            {cart.count > 0 && <span className="badge-count">{cart.count}</span>}
          </button>
          <button
            className="primary"
            onClick={() => {
              setView('home')
              document.getElementById('encomendar')?.scrollIntoView()
            }}
          >
            Encomendar
          </button>
        </div>
      </header>

      {view === 'home' && (
        <main>
          <section className="hero">
            <div>
              <p className="kicker mono">Visora OS · camada neural 1.0</p>
              <h1>Enxergue o mundo com inteligência artificial.</h1>
              <p className="lead">
                Óculos com HUD, tradução em tempo real e um assistente que vive no seu olhar.
                Feitos em Santa Catarina. Encomende o modelo, escolha lente e pacote de IA —
                entrega em todo o Brasil.
              </p>
              <div className="cta-row">
                <a className="primary" href="#encomendar">
                  Montar minha encomenda
                </a>
                <a className="ghost" href="#modelos">
                  Ver modelos
                </a>
              </div>
              <div className="stats">
                <div className="stat">
                  <strong>12 h</strong>
                  <span>bateria contínua</span>
                </div>
                <div className="stat">
                  <strong>40+</strong>
                  <span>idiomas no olhar</span>
                </div>
                <div className="stat">
                  <strong>18 g</strong>
                  <span>no modelo Lite</span>
                </div>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-ring" />
              <img className="logo-hero" src="/logo.jpg" alt="Logo Visora, um olho com núcleo de IA" />
              <div className="hud-chip tl mono">LAT -27.59 · LNG -48.55</div>
              <div className="hud-chip tr mono">OBJETO · pessoa 0.97</div>
              <div className="hud-chip bl mono">TRADUZIR · PT ⇄ EN</div>
            </div>
          </section>

          <section className="section" id="ia">
            <div className="section-head">
              <div>
                <p className="kicker mono">Sistema</p>
                <h2>Uma interface no campo de visão</h2>
              </div>
              <p>
                O Visora OS processa o que você vê, fala e precisa — com controles físicos e
                privacidade no hardware.
              </p>
            </div>
            <div className="features">
              {FEATURES.map((item) => (
                <article className="card" key={item.code}>
                  <span className="code mono">{item.code}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section" id="modelos">
            <div className="section-head">
              <div>
                <p className="kicker mono">Linha 2026</p>
                <h2>Escolha o par. Depois personalize.</h2>
              </div>
              <p>Toque em um modelo para configurar armação, lente e pacote de IA.</p>
            </div>
            <div className="products">
              {PRODUCTS.map((item) => (
                <article
                  key={item.id}
                  className={`product ${product.id === item.id ? 'active' : ''}`}
                  onClick={() => {
                    setProduct(item)
                    document.getElementById('encomendar')?.scrollIntoView()
                  }}
                >
                  <GlassesPreview accent={frame.accent} hex={item.id === product.id ? frame.hex : '#0b1220'} />
                  <div className="product-copy">
                    {item.badge && <div className="pill">{item.badge}</div>}
                    <h3>{item.name}</h3>
                    <p className="tagline">{item.tagline}</p>
                    <p className="price">
                      {brl(item.price)} <small>a partir de</small>
                    </p>
                    <div className="chips">
                      {item.highlights.map((h) => (
                        <span className="chip" key={h}>
                          {h}
                        </span>
                      ))}
                    </div>
                    <p className="tagline">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="section" id="encomendar">
            <div className="section-head">
              <div>
                <p className="kicker mono">Encomenda</p>
                <h2>Configure os {product.name}</h2>
              </div>
              <p>Cada combinação entra em produção sob demanda. Receita de grau pode ser enviada depois do pedido.</p>
            </div>
            <div className="config">
              <div
                className="viewer panel"
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect()
                  const px = (e.clientX - r.left) / r.width - 0.5
                  const py = (e.clientY - r.top) / r.height - 0.5
                  setTilt({ x: py * -12, y: px * 18 })
                }}
                onMouseLeave={() => setTilt({ x: 0, y: 0 })}
              >
                <Glasses color={frame} tilt={tilt} />
              </div>
              <div>
                <h3>Armação</h3>
                <div className="swatches">
                  {FRAME_COLORS.map((c) => (
                    <button
                      key={c.id}
                      className={`swatch ${frame.id === c.id ? 'active' : ''}`}
                      style={{ background: c.hex }}
                      aria-label={c.name}
                      onClick={() => setFrame(c)}
                    />
                  ))}
                </div>
                <p className="tagline">
                  {frame.name} · acento {frame.accent}
                </p>

                <h3>Lentes</h3>
                <div className="opt-grid">
                  {LENSES.map((item) => (
                    <button
                      key={item.id}
                      className={`opt ${lens.id === item.id ? 'active' : ''}`}
                      onClick={() => setLens(item)}
                    >
                      <strong>{item.name}</strong>
                      <small>
                        {item.description}
                        {item.price ? ` · + ${brl(item.price)}` : ' · incluso'}
                      </small>
                    </button>
                  ))}
                </div>

                <h3>Pacote de IA</h3>
                <div className="opt-grid">
                  {AI_PACKS.map((item) => (
                    <button
                      key={item.id}
                      className={`opt ${pack.id === item.id ? 'active' : ''}`}
                      onClick={() => setPack(item)}
                    >
                      <strong>{item.name}</strong>
                      <small>
                        {item.description}
                        {item.price ? ` · + ${brl(item.price)}` : ' · incluso'}
                      </small>
                    </button>
                  ))}
                </div>

                <div className="summary">
                  <div>
                    <div className="price">{brl(unit * qty)}</div>
                    <span className="tagline">produção sob encomenda · 12 a 20 dias úteis</span>
                  </div>
                  <div className="qty" aria-label="Quantidade">
                    <button onClick={() => setQty((n) => Math.max(1, n - 1))}>−</button>
                    <span>{qty}</span>
                    <button onClick={() => setQty((n) => n + 1)}>+</button>
                  </div>
                </div>
                <div className="cta-row" style={{ marginTop: 16 }}>
                  <button className="primary" onClick={addToCart}>
                    Adicionar ao carrinho
                  </button>
                  <button
                    className="secondary"
                    onClick={() => {
                      addToCart()
                      setCartOpen(false)
                      setView('checkout')
                    }}
                  >
                    Encomendar agora
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {view === 'checkout' && (
        <Checkout
          onBack={() => setView('home')}
          onSuccess={(id) => {
            setOrderId(id)
            setView('success')
          }}
        />
      )}

      {view === 'success' && (
        <section className="success">
          <div className="panel">
            <p className="kicker mono">Pedido confirmado</p>
            <h1>Sua visão aumentada está em produção.</h1>
            <p className="order-id mono">{orderId}</p>
            <p className="lead" style={{ margin: '0 auto 24px' }}>
              Enviamos o comprovante e o status da encomenda para o seu e-mail. Você pode acompanhar
              a fabricação da armação e a calibração da IA no app Visora.
            </p>
            <button className="primary" onClick={goHome}>
              Voltar à loja
            </button>
          </div>
        </section>
      )}

      <footer className="footer">
        <div>
          <strong>VISORA</strong>
          <div>Óculos inteligentes feitos em Santa Catarina</div>
        </div>
        <div className="credit">
          <p className="kicker mono">Site feito por</p>
          <p className="credit-name">𝕮𝖍𝖆𝖛𝖊𝖘</p>
          <a href="mailto:pedrochaves1905@gmail.com">pedrochaves1905@gmail.com</a>
          <a
            className="icon-btn github-link"
            href="https://github.com/Chaves1905"
            target="_blank"
            rel="noreferrer"
            aria-label="Abrir GitHub de Chaves"
          >
            <GithubIcon />
          </a>
        </div>
        <div>Privacidade no hardware · LED de câmera · mute físico</div>
      </footer>

      {cartOpen && (
        <>
          <div className="drawer-backdrop" onClick={() => setCartOpen(false)} />
          <aside className="drawer" role="dialog" aria-label="Carrinho">
            <div className="summary">
              <h2>Carrinho</h2>
              <button className="ghost" onClick={() => setCartOpen(false)}>
                Fechar
              </button>
            </div>
            <div className="cart-list">
              {cart.items.length === 0 && <p className="empty">Seu carrinho está vazio.</p>}
              {cart.items.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div>
                    <strong>{item.name}</strong>
                    <p>
                      {item.frameColor.name} · {item.lens.name} · {item.aiPack.name}
                    </p>
                    <p>{brl(item.unitPrice)}</p>
                    <div className="qty" style={{ marginTop: 8 }}>
                      <button onClick={() => cart.updateQty(item.id, item.quantity - 1)}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => cart.updateQty(item.id, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                  <button className="linkish" onClick={() => cart.removeItem(item.id)}>
                    remover
                  </button>
                </div>
              ))}
            </div>
            <div className="cart-foot">
              <div className="total-row">
                <span>Total</span>
                <strong>{brl(cart.total)}</strong>
              </div>
              <button
                className="primary"
                disabled={cart.items.length === 0}
                onClick={() => {
                  setCartOpen(false)
                  setView('checkout')
                }}
              >
                Finalizar encomenda
              </button>
            </div>
          </aside>
        </>
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}

function GlassesPreview({ hex, accent }: { hex: string; accent: string }) {
  return (
    <div>
      <Glasses color={{ id: 'p', name: 'p', hex, accent }} tilt={{ x: 8, y: -12 }} />
    </div>
  )
}

function GithubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.85.09-.67.35-1.12.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 6.84c.85 0 1.71.12 2.51.35 1.9-1.32 2.74-1.05 2.74-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.05 10.05 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 7h15l-1.4 8.2a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.6L5 4H2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="9" cy="20" r="1.4" fill="currentColor" />
      <circle cx="18" cy="20" r="1.4" fill="currentColor" />
    </svg>
  )
}

function Checkout({
  onBack,
  onSuccess,
}: {
  onBack: () => void
  onSuccess: (id: string) => void
}) {
  const cart = useCart()
  const [form, setForm] = useState<CheckoutData>({
    name: '',
    email: '',
    phone: '',
    cep: '',
    address: '',
    city: '',
    state: 'SP',
    payment: 'pix',
  })

  const shipping = cart.total >= 4000 ? 0 : 49
  const total = cart.total + shipping

  const valid = useMemo(() => {
    return (
      form.name.trim().length > 2 &&
      form.email.includes('@') &&
      form.phone.trim().length >= 8 &&
      form.cep.trim().length >= 8 &&
      form.address.trim().length > 4 &&
      form.city.trim().length > 1 &&
      cart.items.length > 0
    )
  }, [form, cart.items.length])

  function set<K extends keyof CheckoutData>(key: K, value: CheckoutData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  if (cart.items.length === 0) {
    return (
      <section className="checkout-page">
        <p className="empty">Carrinho vazio.</p>
        <button className="primary" onClick={onBack}>
          Escolher um modelo
        </button>
      </section>
    )
  }

  return (
    <section className="checkout-page">
      <button className="linkish" onClick={onBack}>
        ← continuar comprando
      </button>
      <div className="checkout" style={{ marginTop: 18 }}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (!valid) return
            const id = `VS-${Date.now().toString().slice(-8)}`
            cart.clear()
            onSuccess(id)
          }}
        >
          <p className="kicker mono">Checkout</p>
          <h1>Dados da encomenda</h1>
          <label>
            Nome completo
            <input value={form.name} onChange={(e) => set('name', e.target.value)} required />
          </label>
          <div className="row-2">
            <label>
              E-mail
              <input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} required />
            </label>
            <label>
              Telefone
              <input value={form.phone} onChange={(e) => set('phone', e.target.value)} required />
            </label>
          </div>
          <div className="row-2">
            <label>
              CEP
              <input value={form.cep} onChange={(e) => set('cep', e.target.value)} required />
            </label>
            <label>
              Cidade
              <input value={form.city} onChange={(e) => set('city', e.target.value)} required />
            </label>
          </div>
          <label>
            Endereço
            <input value={form.address} onChange={(e) => set('address', e.target.value)} required />
          </label>
          <label>
            Estado
            <select value={form.state} onChange={(e) => set('state', e.target.value)}>
              {['SP', 'RJ', 'MG', 'RS', 'PR', 'BA', 'DF', 'SC', 'PE', 'CE'].map((uf) => (
                <option key={uf}>{uf}</option>
              ))}
            </select>
          </label>
          <p>Pagamento</p>
          <div className="pay">
            <button
              type="button"
              className={`opt ${form.payment === 'pix' ? 'active' : ''}`}
              onClick={() => set('payment', 'pix')}
            >
              <strong>Pix</strong>
              <small>confirmação imediata</small>
            </button>
            <button
              type="button"
              className={`opt ${form.payment === 'card' ? 'active' : ''}`}
              onClick={() => set('payment', 'card')}
            >
              <strong>Cartão</strong>
              <small>até 12x sem juros</small>
            </button>
          </div>
          <button className="primary" type="submit" disabled={!valid}>
            Confirmar encomenda · {brl(total)}
          </button>
        </form>
        <aside className="panel" style={{ padding: 20 }}>
          <h3>Resumo</h3>
          {cart.items.map((item) => (
            <p key={item.id} className="tagline">
              {item.quantity}× {item.name} · {item.frameColor.name} · {brl(item.unitPrice * item.quantity)}
            </p>
          ))}
          <p className="tagline">Frete {shipping === 0 ? 'grátis' : brl(shipping)}</p>
          <div className="total-row" style={{ marginTop: 16 }}>
            <span>Total</span>
            <strong>{brl(total)}</strong>
          </div>
        </aside>
      </div>
    </section>
  )
}
