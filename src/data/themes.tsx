import React from 'react';
import {
  Shield, Zap, Leaf, Heart, Wind, FlaskConical, Sun,
} from 'lucide-react';
import { ThemeData } from '../components/ThemePage';

// All recipes sourced from: "Bebidas para cada parte do corpo" (Dr. Jorge D. Pamplona Roger)
// E:\CLAUDE\SUCOSAÚDE\INFORMA

export const THEMES: Record<string, ThemeData> = {

  /* ═══════════════════════════════════════════════════
     IMUNIDADE — Sistema Imunológico (pgs. 202-215)
  ═══════════════════════════════════════════════════ */
  imunidade: {
    id: 'imunidade',
    label: 'Imunidade',
    badge: 'SISTEMA IMUNOLÓGICO',
    headline: 'Imunidade & Defesas',
    subheadline: 'Bebidas com vitaminas C, antioxidantes e fitoquímicos que estimulam as defesas naturais do organismo. Fonte: Bebidas para cada parte do corpo – Dr. Jorge D. Pamplona Roger.',
    heroGradient: 'from-orange-600 via-amber-600 to-yellow-600',
    heroGlow: 'from-orange-400 to-amber-400',
    accentFrom: 'from-orange-400',
    accentTo: 'to-amber-500',
    accentText: 'text-orange-700',
    accentBg: 'bg-orange-50',
    accentBorder: 'border-orange-200',
    icon: <Shield className="w-5 h-5" />,
    heroIcon: <Shield className="w-10 h-10 text-white" />,
    benefits: [
      'Vitamina C', 'Vitamina K', 'Antocianinas', 'Quercetina',
      'Antioxidante', 'Antiinflamatório', 'Antiviral',
    ],
    juices: [
      {
        title: 'Suco Imunizante de Limão e Alho',
        description: 'O limão e o suco de laranja fornecem vitamina C. O alho cru e a pimenta-caiena têm ação antiviral e antibacteriana comprovada.',
        ingredients: [
          '3 limões espremidos (cerca de 90g)',
          '1 colher (sopa) de casca de limão ralada',
          '2 xícaras de suco de laranja (cerca de 500ml)',
          '4 dentes de alho cru (cerca de 10g)',
          '1 colher (chá) de gengibre ralado (2g)',
          '¼ colher (chá) de pimenta-caiena (1,5g)',
          '1 colher (sopa) de mel (cerca de 20g)',
        ],
        properties: 'Vitamina C, Alicina (alho), Capsaicina, Antiviral, Antibacteriano.',
        prepTime: '5 min',
        difficulty: 'Fácil',
      },
      {
        title: 'Shake Antioxidante de Mirtilos',
        description: 'As antocianinas dos mirtilos e o repolho roxo possuem alto poder antioxidante, fortalecendo as células de defesa imunológica.',
        ingredients: [
          '1 xícara de mirtilos frescos ou açaí (cerca de 150g)',
          '1 xícara de leite de coco (cerca de 240ml)',
          '3 colheres (sopa) de suco de limão (45ml)',
          '2 xícaras de repolho roxo (cerca de 180g)',
        ],
        properties: 'Antocianinas, Vitamina C, Vitamina K, Probióticos.',
        prepTime: '5 min',
        difficulty: 'Fácil',
      },
      {
        title: 'Berry Power (Groselhas & Toranja)',
        description: 'Groselhas negras e mirtilos são fontes concentradas de antocianinas. A toranja ativa enzimas hepáticas de desintoxicação.',
        ingredients: [
          '½ xícara de suco de toranja rosada (cerca de 120ml)',
          '1 xícara de groselhas negras, açaí ou mirtilo (cerca de 112g)',
          '1 colher (sopa) de castanha-de-caju ou amêndoa (cerca de 13g)',
        ],
        properties: 'Antocianinas, Vitamina C, Vitamina E, Potente antioxidante.',
        prepTime: '5 min',
        difficulty: 'Fácil',
      },
      {
        title: 'Shake de Amoras & Mirtilos',
        description: 'Uma combinação de berries ricos em compostos fenólicos, tâmaras e germen de trigo para nutrir e fortalecer o sistema imune.',
        ingredients: [
          '2 xícaras de leite de aveia ou quinoa (480ml)',
          '½ xícara de amoras frescas',
          '½ xícara de mirtilos frescos ou goji berry (cerca de 74g)',
          '½ xícara de morangos ou goiaba (cerca de 70g)',
          '1 colher (sopa) de germen de trigo (cerca de 10g)',
          '2 tâmaras sem caroço (cerca de 30g)',
          '6 nozes ou castanha-do-pará (cerca de 30g)',
        ],
        properties: 'Vitaminas C e E, Ácidos graxos ômega-3, Zinco, Selênio.',
        prepTime: '8 min',
        difficulty: 'Fácil',
      },
    ],
    tips: [
      'Beba os sucos frescos e imediatamente — a vitamina C se oxida rapidamente após o preparo.',
      'O alho perde parte do seu poder antiviral quando aquecido; use-o cru nos sucos.',
      'Consuma diariamente, especialmente em períodos de mudança de temperatura ou estresse.',
      'Atenção: portadores de coagulopatias devem evitar grandes quantidades de toranja.',
    ],
  },

  /* ═══════════════════════════════════════════════════
     ENERGIA — Sistema Nervoso (pgs. 52-69)
  ═══════════════════════════════════════════════════ */
  energia: {
    id: 'energia',
    label: 'Energia',
    badge: 'SISTEMA NERVOSO & ENERGIA',
    headline: 'Energia, Foco & Sono',
    subheadline: 'Bebidas ricas em vitaminas do complexo B, magnésio e fitonutrientes para equilibrar o sistema nervoso, combater o cansaço e melhorar a memória. Fonte: Bebidas para cada parte do corpo.',
    heroGradient: 'from-yellow-500 via-amber-500 to-orange-500',
    heroGlow: 'from-yellow-400 to-amber-300',
    accentFrom: 'from-yellow-400',
    accentTo: 'to-amber-500',
    accentText: 'text-amber-700',
    accentBg: 'bg-amber-50',
    accentBorder: 'border-amber-200',
    icon: <Zap className="w-5 h-5" />,
    heroIcon: <Zap className="w-10 h-10 text-white" />,
    benefits: [
      'Complexo B', 'Magnésio', 'Triptofano', 'Ômega-3',
      'Neuroprotetor', 'Ansiolítico', 'Antioxidante',
    ],
    juices: [
      {
        title: 'Doce Calma (Ansiedade)',
        description: 'As bananas e o mel fornecem glicose de liberação gradual para os neurônios. O germen de trigo é rico em vitaminas do complexo B, essenciais contra a ansiedade.',
        ingredients: [
          '2 bananas pequenas',
          '1 xícara de morangos (cerca de 140g)',
          '4 colheres (sopa) de leite de coco (60ml)',
          '2 colheres (chá) de germen de trigo (cerca de 10g)',
          '2 colheres (sopa) de mel (cerca de 40g)',
          '1 xícara de leite de aveia ou de soja (240ml)',
        ],
        properties: 'Vitaminas B1, B6, Magnésio, Triptofano, Fibras solúveis.',
        prepTime: '5 min',
        difficulty: 'Fácil',
      },
      {
        title: 'Disco Rígido (Memória)',
        description: 'A manga favorece a memória. A uva-passa reduz triglicérides. O leite de coco fornece triglicérides de cadeia média, combustível preferencial do cérebro.',
        ingredients: [
          '½ manga picada (cerca de 168g)',
          '1 maçã (se orgânica, com casca, cerca de 160g)',
          '2 colheres (sopa) de uva-passa sem sementes (cerca de 30g)',
          '1 xícara de leite de coco, de soja ou de aveia (240ml)',
          '2 folhas de menta ou hortelã',
        ],
        properties: 'Vitaminas C e A, Ômega-6, Antioxidantes, Neuroprotetor.',
        prepTime: '5 min',
        difficulty: 'Fácil',
      },
      {
        title: 'Banana Expressa (Energia & Coração)',
        description: 'A banana, rico em potássio, combate a hipertensão e regula a pressão arterial. O germen de trigo enriquece com vitaminas do complexo B.',
        ingredients: [
          '2 xícaras de leite de arroz (480ml)',
          '2 bananas picadas (de terra, se possível)',
          '1 manga média picada',
          '1 colher (sopa) de germen de trigo (6g)',
          '¼ colher (chá) de canela em pó (1g)',
        ],
        properties: 'Vitaminas B e C, Potássio, Magnésio, Energia sustentada.',
        prepTime: '5 min',
        difficulty: 'Fácil',
      },
      {
        title: 'Infusão Sedativa (Sono)',
        description: 'A valeriana, melissa e tília são plantas medicinais com ação sedativa comprovada, favorecendo um sono reparador sem efeitos indesejáveis.',
        ingredients: [
          '1 colher (chá) de raiz de valeriana',
          '1 colher (chá) de folhas de melissa',
          '1 colher (chá) de folhas de tília',
          '1 colher (chá) de mel ou melado',
          '1 copo de água (250ml)',
        ],
        properties: 'Ácido valerenânico, Ácido rosmarínico, Sonífero, Calmante.',
        prepTime: '10 min',
        difficulty: 'Fácil',
      },
    ],
    tips: [
      'O shake Doce Calma é ideal para crianças e adultos que sofrem de ansiedade — tomar pela manhã ou no lanche da tarde.',
      'A infusão sedativa deve ser tomada cerca de uma hora antes de dormir.',
      'O Disco Rígido é recomendado para pessoas com perda significativa de memória ou mal de Alzheimer — tomar no desjejum ou lanche.',
      'Evite sucos com açúcar refinado: picos glicêmicos aumentam a irritabilidade e a ansiedade.',
    ],
  },

  /* ═══════════════════════════════════════════════════
     DIGESTÃO — Estômago & Intestino (pgs. 114-135)
  ═══════════════════════════════════════════════════ */
  digestao: {
    id: 'digestao',
    label: 'Digestão',
    badge: 'ESTÔMAGO & INTESTINO',
    headline: 'Digestão & Intestino',
    subheadline: 'Sucos e caldos com enzimas digestivas, fibras e fitoquímicos protetores para o estômago e intestino. Fonte: Bebidas para cada parte do corpo.',
    heroGradient: 'from-teal-600 via-cyan-600 to-emerald-600',
    heroGlow: 'from-teal-400 to-cyan-400',
    accentFrom: 'from-teal-400',
    accentTo: 'to-cyan-500',
    accentText: 'text-teal-700',
    accentBg: 'bg-teal-50',
    accentBorder: 'border-teal-200',
    icon: <Leaf className="w-5 h-5" />,
    heroIcon: <Leaf className="w-10 h-10 text-white" />,
    benefits: [
      'Enzimas digestivas', 'Fibras solúveis', 'Antiulceroso',
      'Anticancerígeno', 'Protetor do estômago', 'Laxativo suave',
    ],
    juices: [
      {
        title: 'Protetor Vegetal (Helicobacter Pylori)',
        description: 'O brócolis é poderoso antioxidante do estômago e o mirtilo diminui a aderência da bactéria Helicobacter pylori à mucosa gástrica.',
        ingredients: [
          '1 ramo de brócolis (cerca de 100g), cozido ao vapor',
          '1 xícara de suco de abacaxi (240ml)',
          '½ xícara de mirtilos frescos ou de cor coral/azul (cerca de 150g)',
        ],
        properties: 'Sulforafano, Indol-3-carbinol, Antocianinas, Anticancerígeno.',
        prepTime: '12 min',
        difficulty: 'Médio',
      },
      {
        title: 'Suco Digestivo de Cenoura & Romã',
        description: 'A cenoura e a abobrinha têm efeito protetor sobre a mucosa do estômago. O suco de romã é adstringente e antiinflamatório intestinal.',
        ingredients: [
          '5 cenouras médias (cerca de 305g)',
          '1 abobrinha média (cerca de 196g)',
          '1 batata pequena (cerca de 170g)',
          '½ xícara de suco de romã (140ml)',
        ],
        properties: 'Beta-caroteno, Vitamina C, Taninos, Protetor da mucosa.',
        prepTime: '10 min',
        difficulty: 'Fácil',
      },
      {
        title: 'Suco de Ameixas e Figos (Intestino)',
        description: 'Ameixas e figos secos hidratados são os laxativos naturais mais eficazes. O kiwi acrescenta enzimas digestivas e vitamina C.',
        ingredients: [
          '4 ameixas secas sem caroço (cerca de 40g)',
          '4 figos secos (cerca de 34g), hidratados',
          '1 kiwi médio sem a casca (cerca de 70g)',
          '1 copo de suco de laranja (250ml)',
        ],
        properties: 'Fibras insolúveis, Sorbitol, Vitamina C, Laxante natural.',
        prepTime: '10 min',
        difficulty: 'Fácil',
      },
      {
        title: 'Suco Verde de Pepino & Salsão',
        description: 'O pepino e o salsão são diuréticos e anti-inflamatórios do trato digestivo. O abacaxi contém bromelina, poderosa enzima digestiva.',
        ingredients: [
          '1 pepino de tamanho médio (cerca de 200g)',
          '4 talos de salsão (cerca de 250g)',
          '1 xícara de suco de abacaxi (cerca de 240ml)',
        ],
        properties: 'Bromelina, Silício, Diurético, Anti-inflamatório digestivo.',
        prepTime: '5 min',
        difficulty: 'Fácil',
      },
    ],
    tips: [
      'O Protetor Vegetal pode ser tomado diariamente como preventivo ou como tratamento coadjuvante por um a dois meses.',
      'O suco de ameixas e figos é ideal tomado em jejum pela manhã para estimular o trânsito intestinal.',
      'Evite adoçar os sucos digestivos — o açúcar alimenta bactérias prejudiciais ao intestino.',
      'O suco verde de pepino e salsão deve ser tomado adoçando a gosto (ver p. 22 do livro).',
    ],
  },

  /* ═══════════════════════════════════════════════════
     PELE — Bebidas para a Pele (pgs. 194-201)
  ═══════════════════════════════════════════════════ */
  pele: {
    id: 'pele',
    label: 'Pele',
    badge: 'BEBIDAS PARA A PELE',
    headline: 'Saúde da Pele',
    subheadline: 'Sucos e extratos com vitaminas A, C, E e silício orgânico para nutrir, cicatrizar e proteger a pele de dentro para fora. Fonte: Bebidas para cada parte do corpo.',
    heroGradient: 'from-pink-500 via-rose-500 to-fuchsia-600',
    heroGlow: 'from-pink-400 to-rose-400',
    accentFrom: 'from-pink-400',
    accentTo: 'to-rose-500',
    accentText: 'text-rose-700',
    accentBg: 'bg-rose-50',
    accentBorder: 'border-rose-200',
    icon: <Sun className="w-5 h-5" />,
    heroIcon: <Sun className="w-10 h-10 text-white" />,
    benefits: [
      'Vitamina C', 'Silício orgânico', 'Vitamina E', 'Vitamina A',
      'Cicatrizante', 'Desinfetante', 'Anti-inflamatório', 'Beta-caroteno',
    ],
    juices: [
      {
        title: 'Suco de Aloe Vera (Babosa)',
        description: 'A babosa tomada por via oral apresenta inúmeros benefícios: desinfeta, cicatriza, combate infecções cutâneas, acne, celulite e psoríase.',
        ingredients: [
          'Várias folhas de Aloe vera (babosa)',
          'Suco de limão a gosto (1-2 colheres por copo)',
          'Água a gosto',
          'Adoçante a gosto',
        ],
        properties: 'Acemanano, Mucilagem, Desinfetante, Cicatrizante, Anti-inflamatório.',
        prepTime: '10 min',
        difficulty: 'Médio',
      },
      {
        title: 'Suco de Cenoura & Abobrinha',
        description: 'A cenoura é a maior fonte de beta-caroteno, que o organismo converte em vitamina A — nutriente essencial para a renovação celular e saúde da pele.',
        ingredients: [
          '1 bulbo de erva-doce (cerca de 230g)',
          '½ cebola (cerca de 35g)',
          '3 cenouras (cerca de 200g)',
          '1 colher (sopa) de mel ou melado (cerca de 21g)',
        ],
        properties: 'Beta-caroteno, Vitamina A, Flavonoides, Antioxidante.',
        prepTime: '8 min',
        difficulty: 'Fácil',
      },
      {
        title: 'Shake Verde de Kiwi & Abacate',
        description: 'O abacate fornece vitamina E e ácidos graxos essenciais que nutrem a pele e a protegem do ressecamento. O kiwi é rico em vitamina C para síntese de colágeno.',
        ingredients: [
          '2 kiwis médios (cerca de 140g)',
          '½ abacate médio (cerca de 100g)',
          '½ xícara de espinafre (cerca de 30g)',
          '1 xícara de suco de uva (cerca de 240ml)',
          '2 colheres (sopa) de melado ou açúcar mascavo',
        ],
        properties: 'Vitamina C, Vitamina E, Ácidos graxos essenciais, Clorofila.',
        prepTime: '8 min',
        difficulty: 'Fácil',
      },
      {
        title: 'Shake Antioxidante de Mirtilos & Repolho',
        description: 'As antocianinas dos mirtilos protegem as fibras de colágeno da degradação oxidativa. O repolho roxo é fonte de vitamina K e fibras para a pele.',
        ingredients: [
          '1 xícara de mirtilos frescos ou açaí (cerca de 150g)',
          '1 xícara de leite de coco (cerca de 240ml)',
          '3 colheres (sopa) de suco de limão (45ml)',
          '2 xícaras de repolho roxo (cerca de 180g)',
        ],
        properties: 'Antocianinas, Vitamina K, Vitamina C, Colágeno vegetal.',
        prepTime: '5 min',
        difficulty: 'Fácil',
      },
    ],
    tips: [
      'O suco de aloe vera deve ser tomado de uma a dois copos de 125ml por dia, preferencialmente antes das refeições.',
      'A vitamina E do abacate age em sinergia com a vitamina C do kiwi — consuma juntos para potencializar o efeito antioxidante.',
      'Para infecções cutâneas, a aloe vera pode ser aplicada diretamente sobre a pele além de consumida por via oral.',
      'Evite sucos industrializados com corantes — os pigmentos artificiais podem piorar problemas de pele.',
    ],
  },

  /* ═══════════════════════════════════════════════════
     CORAÇÃO — Sistema Cardiovascular (pgs. 70-83)
  ═══════════════════════════════════════════════════ */
  coracao: {
    id: 'coracao',
    label: 'Coração',
    badge: 'SISTEMA CARDIOVASCULAR',
    headline: 'Saúde do Coração',
    subheadline: 'Bebidas hipotensoras, vasodilatatoras e protetoras das artérias, indicadas para pressão arterial e saúde cardiovascular. Fonte: Bebidas para cada parte do corpo.',
    heroGradient: 'from-red-600 via-rose-600 to-pink-600',
    heroGlow: 'from-red-400 to-rose-400',
    accentFrom: 'from-red-400',
    accentTo: 'to-rose-500',
    accentText: 'text-red-700',
    accentBg: 'bg-red-50',
    accentBorder: 'border-red-200',
    icon: <Heart className="w-5 h-5" />,
    heroIcon: <Heart className="w-10 h-10 text-white" />,
    benefits: [
      'Hipotensor', 'Vasodilatador', 'Potássio', 'Magnésio',
      'Alcalinizante', 'Depurativo', 'Protetor das artérias',
    ],
    juices: [
      {
        title: 'Banana Expressa (Hipertensão – 1)',
        description: 'A banana é rica em potássio, que neutraliza o efeito hipertensivo do sódio. O germen de trigo fornece vitaminas do complexo B para o bom funcionamento cardíaco.',
        ingredients: [
          '2 xícaras de leite de arroz (480ml)',
          '2 bananas picadas (de preferência banana-da-terra)',
          '1 manga média picada',
          '1 colher (sopa) de germen de trigo (6g)',
          '¼ colher (chá) de canela em pó (1g)',
        ],
        properties: 'Vitaminas B e C, Potássio, Magnésio, Hipotensor, Nutritivo.',
        prepTime: '5 min',
        difficulty: 'Fácil',
      },
      {
        title: 'Regulador de Pressão (Hipertensão – 2)',
        description: 'A beterraba reduz a pressão arterial via nitratos. O tomate é inibidor da enzima conversora da angiotensina. O salsão tem efeito diurético e depurativo.',
        ingredients: [
          '1 beterraba grande (cerca de 280g)',
          '2 tomates médios (cerca de 180g)',
          '2 talos de salsão (cerca de 80g)',
          '1 colher (sopa) de salsa picada (cerca de 13g)',
        ],
        properties: 'Nitratos, Licopeno, Ácido fólico, Potássio, Hipotensor.',
        prepTime: '8 min',
        difficulty: 'Fácil',
      },
      {
        title: 'Verde Antianêmico (Kiwi & Abacate)',
        description: 'O kiwi é das frutas mais ricas em vitamina C, que favorece a absorção do ferro do espinafre. O abacate fornece gorduras boas que protegem as artérias.',
        ingredients: [
          '2 kiwis médios (cerca de 140g)',
          '½ abacate médio (cerca de 100g)',
          '½ xícara de espinafre (cerca de 30g)',
          '1 xícara de suco de uva (cerca de 240ml)',
          '2 colheres (sopa) de melado ou açúcar mascavo',
        ],
        properties: 'Vitaminas C e E, Ferro, Clorofila, Ácido fólico, Anticancerígeno.',
        prepTime: '8 min',
        difficulty: 'Fácil',
      },
      {
        title: 'Suco de Uvas Pretas (Protetor Cardíaco)',
        description: 'O suco de uvas pretas é muito superior ao vinho alcoólico como protetor cardíaco e preventivo do infarto, sendo isento dos inconvenientes do álcool.',
        ingredients: [
          '1½ xícara de uvas de preferência pretas (cerca de 230g)',
        ],
        properties: 'Resveratrol, OPCs, Flavonoides, Vitaminas C e K, Anticancerígeno.',
        prepTime: '5 min',
        difficulty: 'Fácil',
      },
    ],
    tips: [
      'O shake Banana Expressa é ideal para o desjejum ou jantar — consumir regularmente para regular a pressão arterial.',
      'O Regulador de Pressão, tomado diariamente, pode tornar desnecessária a medicação anti-hipertensiva em muitos casos.',
      'O suco de uvas pretas pode ser conservado por vários dias na geladeira — ferver antes conserva mais tempo.',
      'Portadores de coagulopatias devem consultar médico antes de consumir grandes quantidades de uvas e beterraba.',
    ],
  },

  /* ═══════════════════════════════════════════════════
     DETOX — Sangue & Toxinas (pgs. 84-113)
  ═══════════════════════════════════════════════════ */
  detox: {
    id: 'detox',
    label: 'Detox',
    badge: 'SANGUE & PURIFICAÇÃO',
    headline: 'Detox & Purificação',
    subheadline: 'Sucos depurativos que limpam o sangue, eliminam toxinas e desintoxicam o fígado. Fonte: Bebidas para cada parte do corpo – Dr. Jorge D. Pamplona Roger.',
    heroGradient: 'from-violet-600 via-purple-600 to-indigo-600',
    heroGlow: 'from-violet-400 to-purple-400',
    accentFrom: 'from-violet-400',
    accentTo: 'to-purple-500',
    accentText: 'text-violet-700',
    accentBg: 'bg-violet-50',
    accentBorder: 'border-violet-200',
    icon: <Wind className="w-5 h-5" />,
    heroIcon: <FlaskConical className="w-10 h-10 text-white" />,
    benefits: [
      'Desintoxicante', 'Depurativo', 'Antioxidante',
      'Alcalinizante', 'Anticancerígeno', 'Protetor hepático',
    ],
    juices: [
      {
        title: 'Super Detox (Cenoura, Maçã & Salsão)',
        description: 'Clássico dos sucos depurativos: cenoura e maçã fornecem vitaminas e enzimas. O salsão tem ação diurética. O limão alcaliniza o sangue.',
        ingredients: [
          '5 cenouras médias (cerca de 300g)',
          '2 maçãs médias (cerca de 320g)',
          '4 talos de salsão (cerca de 150g)',
          '1 limão médio (cerca de 80g)',
        ],
        properties: 'Beta-caroteno, Vitaminas A e C, Diurético, Depurativo, Alcalinizante.',
        prepTime: '8 min',
        difficulty: 'Fácil',
      },
      {
        title: 'Suco de Toranja (Grapefruit)',
        description: 'A toranja é possivelmente o suco com maior capacidade de eliminar toxinas e substâncias estranhas do sangue — ativa as enzimas hepáticas de desintoxicação.',
        ingredients: [
          '1 a 2 toranjas (grapefruit) — pode-se usar industrializado ou, melhor ainda, o natural.',
        ],
        properties: 'Naringenina, Vitamina C, Desintoxicante, Depurativo, Emagrecedor.',
        prepTime: '3 min',
        difficulty: 'Fácil',
      },
      {
        title: 'Goiaba com Linhaça (Triglicérides)',
        description: 'A goiaba e a linhaça são conhecidos pela capacidade de diminuir a quantidade de gordura (triglicérides) no sangue, reduzindo o risco cardíaco.',
        ingredients: [
          '2 xícaras de goiaba descascada e picada (cerca de 330g)',
          '1 colher (sopa) de sementes de linhaça moídas ou chia (cerca de 10g)',
          '½ xícara de leite de soja (cerca de 240ml)',
        ],
        properties: 'Vitaminas C e B3, Ômega-3 (linhaça), Reduz triglicérides.',
        prepTime: '5 min',
        difficulty: 'Fácil',
      },
      {
        title: 'Depurativo para o Fígado (Caldo de Alcachofra)',
        description: 'A alcachofra contém cinarina, que aumenta a produção de bile e descongestiona o fígado. A cebola potencializa mutuamente o efeito hepatoprotetor.',
        ingredients: [
          '2 alcachofras (cerca de 250g) — usar folhas exteriores, caule e folhas internas',
          '1 cebola média (cerca de 110g)',
          '2 colheres (sopa) de suco de limão (30ml)',
          '1 litro de água',
        ],
        properties: 'Cinarina, Silibina, Colerético, Protetor hepático, Alcalinizante.',
        prepTime: '20 min',
        difficulty: 'Médio',
      },
    ],
    tips: [
      'Atenção: a toranja (grapefruit) é incompatível com mais de 80 medicamentos — consulte o médico antes de iniciar o uso regular.',
      'O Depurativo para o Fígado (caldo de alcachofra) deve ser tomado de uma a três xícaras por dia. Não usar em caso de obstrução das vias biliares.',
      'O Super Detox admite muitas variações: pode-se acrescentar acerolinha de beterraba, pepino ou um pouco de gengibre.',
      'Faça os sucos depurativos preferencialmente pela manhã em jejum para maximizar a absorção dos fitoquímicos.',
    ],
  },
};
