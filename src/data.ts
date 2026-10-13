import type { AiPack, FrameColor, LensOption, Product } from './types'

export const FRAME_COLORS: FrameColor[] = [
  { id: 'midnight', name: 'Midnight', hex: '#0b1220', accent: '#3ec4ff' },
  { id: 'glacier', name: 'Glacier', hex: '#d7e7f5', accent: '#1a7dff' },
  { id: 'carbon', name: 'Carbon', hex: '#2a2e33', accent: '#8be9ff' },
  { id: 'volt', name: 'Volt', hex: '#081614', accent: '#3dffc6' },
]

export const LENSES: LensOption[] = [
  {
    id: 'clear',
    name: 'Cristal',
    description: 'Lente transparente com HUD de alta nitidez',
    price: 0,
  },
  {
    id: 'photo',
    name: 'Foto cromática',
    description: 'Escurece ao sol e protege contra UV e luz azul',
    price: 390,
  },
  {
    id: 'rx',
    name: 'Grau incluso',
    description: 'Lente oftalmológica calibrada após envio da receita',
    price: 690,
  },
]

export const AI_PACKS: AiPack[] = [
  {
    id: 'core',
    name: 'IA Core',
    description: 'Tradução, legendas e identificação de objetos',
    price: 0,
  },
  {
    id: 'vision',
    name: 'Vision+',
    description: 'Navegação espacial, leitura de documentos e memória visual',
    price: 490,
  },
  {
    id: 'pro',
    name: 'HUD Pro',
    description: 'Assistente contínuo, alertas de contexto e API para apps',
    price: 890,
  },
]

export const PRODUCTS: Product[] = [
  {
    id: 'nova',
    name: 'Visora Nova',
    tagline: 'O modelo-bandeira',
    price: 4990,
    badge: 'Mais pedido',
    description:
      'HUD holográfico, chip neural próprio e áudio espacial. Feito para o dia a dia urbano e trabalho.',
    highlights: ['Chip Neural V1', '12 h de bateria', 'Câmera 12 MP dual'],
  },
  {
    id: 'pulse',
    name: 'Visora Pulse',
    tagline: 'Performance e movimento',
    price: 3790,
    description:
      'Leve, resistente a suor e impacto. Ideal para esporte, campo e deslocamento.',
    highlights: ['IP67', 'Modo esportivo', 'GPS de precisão'],
  },
  {
    id: 'prism',
    name: 'Visora Prism',
    tagline: 'Imersão máxima',
    price: 5490,
    badge: 'Pré-venda',
    description:
      'Campo de visão ampliado e renderização AR em tempo real para criação e entretenimento.',
    highlights: ['FOV 50°', 'AR em 60 fps', 'Áudio 3D'],
  },
  {
    id: 'lite',
    name: 'Visora Lite',
    tagline: 'Primeiro contato com IA',
    price: 2490,
    description:
      'Entrada na plataforma Visora: tradução instantânea, legendas e notificações discretas.',
    highlights: ['18 g', 'Tradução 40 idiomas', 'App Visora OS'],
  },
]

export const FEATURES = [
  {
    code: '01',
    title: 'Visão aumentada',
    text: 'A IA descreve o ambiente, traduz placas e destaca o que importa no seu campo de visão.',
  },
  {
    code: '02',
    title: 'Assistente no olhar',
    text: 'Peça um resumo, uma rota ou um lembrete sem tirar o celular do bolso. O HUD responde no instante.',
  },
  {
    code: '03',
    title: 'Privacidade no hardware',
    text: 'LED de gravação, botão físico de mute e processamento local para dados sensíveis.',
  },
  {
    code: '04',
    title: 'Encomenda sob medida',
    text: 'Escolha armação, lente e pacote de IA. Receita oftalmológica entra no fluxo de produção.',
  },
]
