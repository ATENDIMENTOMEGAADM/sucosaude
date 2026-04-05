import React from 'react';
import {
  Brain, Heart, Droplet, Wind, Leaf, FlaskConical,
  Apple, Activity, Baby, Zap, Bone, Sparkles, Shield, Eye,
} from 'lucide-react';
import { ThemeData } from '../components/ThemePage';

// All recipes sourced from: "Bebidas para cada parte do corpo" — Dr. Jorge D. Pamplona Roger
// Scanned pages: E:\CLAUDE\SUCOSAÚDE\INFORMA

export const THEMES: Record<string, ThemeData> = {

  /* ─────────────────────────────────────────────
     SISTEMA NERVOSO  (book pp. 52-69)
  ───────────────────────────────────────────── */
  nervo: {
    id: 'nervo',
    label: 'Sistema Nervoso',
    badge: 'SISTEMA NERVOSO',
    headline: 'Bebidas para o Sistema Nervoso',
    subheadline: 'Sucos, shakes e infusões indicados para ansiedade, insônia, depressão, perda de memória e outras condições do sistema nervoso.',
    heroGradient: 'from-violet-700 via-purple-700 to-indigo-800',
    heroGlow: 'from-violet-400 to-purple-400',
    accentFrom: 'from-violet-400',
    accentTo: 'to-purple-500',
    accentText: 'text-violet-700',
    accentBg: 'bg-violet-50',
    accentBorder: 'border-violet-200',
    icon: <Brain className="w-5 h-5" />,
    heroIcon: <Brain className="w-10 h-10 text-white" />,
    benefits: ['Calmante', 'Ansiolítico', 'Sonífero', 'Neuroprotetor', 'Antidepressivo', 'Vitaminas B'],
    juices: [
      {
        title: 'Doce Calma (Ansiedade)',
        description: 'Indicado para pessoas que sofrem de ansiedade. As bananas fornecem triptofano, o germen de trigo é rico em vitaminas B e o mel tem efeito calmante suave.',
        ingredients: ['2 bananas pequenas', '1 xícara de morangos (cerca de 140 g)', '4 colheres (sopa) de leite de coco (60 ml)', '2 colheres (chá) de germen de trigo (cerca de 10 g)', '2 colheres (sopa) de mel (cerca de 40 g)', '1 xícara de leite de aveia ou leite de soja (240 ml)'],
        properties: 'Triptofano, Vitaminas B, Magnésio, Calmante, Antioxidante.',
        prepTime: '5 min', difficulty: 'Fácil',
      },
      {
        title: 'Suco de Cerejas (Insônia)',
        description: 'As cerejas contêm melatonina natural, o hormônio do sono. Tomar uma xícara desta infusão aproximadamente uma hora antes de dormir favorece um sono reparador.',
        ingredients: ['3 xícaras de cerejas (cerca de 280 g)'],
        properties: 'Melatonina natural, Antioxidante, Sonífero, Antienvelhecimento.',
        prepTime: '5 min', difficulty: 'Fácil',
      },
      {
        title: 'Infusão Sedativa (Insônia)',
        description: 'Uso de meia a uma xícara desta infusão, uma hora antes de dormir, favorece um sono reparador sem causar efeitos indesejáveis.',
        ingredients: ['1 colher (chá) de raiz de valeriana', '1 colher (chá) de folhas de melissa', '1 colher (chá) de folhas de tília', '1 colher (chá) de mel ou melado ou açúcar mascavo', '1 copo de água (250 ml)'],
        properties: 'Sonífero, Calmante, Ácido valerenânico, Ácido rosmarínico.',
        prepTime: '10 min', difficulty: 'Fácil',
      },
      {
        title: 'Disco Rígido (Memória & Alzheimer)',
        description: 'A manga favorece a memória e pode ajudar a evitar o mal de Alzheimer. O leite de coco fornece triglicérides de cadeia média, combustível preferencial dos neurônios.',
        ingredients: ['½ manga (cerca de 168 g)', '1 maçã (se orgânica, com casca, cerca de 160 g)', '2 colheres (sopa) de uva-passa sem sementes (cerca de 30 g)', '1 xícara de leite de coco, de soja ou de aveia (240 ml)', '2 folhas de menta ou hortelã'],
        properties: 'Neuroprotetor, Vitaminas A e C, Antioxidantes, Ômega-6.',
        prepTime: '5 min', difficulty: 'Fácil',
      },
    ],
    tips: [
      'O Doce Calma é ideal para adultos e crianças com ansiedade — tomar no desjejum ou lanche da tarde.',
      'A infusão sedativa deve ser tomada cerca de uma hora antes de dormir.',
      'O Disco Rígido é recomendado para perda significativa de memória — tomar no desjejum ou lanche.',
      'Evite cafeína (café, chá-preto, refrigerantes) se sofre de ansiedade ou insônia.',
    ],
  },

  /* ─────────────────────────────────────────────
     SISTEMA CARDIOVASCULAR  (book pp. 70-83)
  ───────────────────────────────────────────── */
  cardiovascular: {
    id: 'cardiovascular',
    label: 'Cardiovascular',
    badge: 'SISTEMA CARDIOVASCULAR',
    headline: 'Bebidas para o Coração',
    subheadline: 'Sucos e shakes hipotensores, vasodilatadores e protetores das artérias para hipertensão, arteriosclerose e saúde cardiovascular.',
    heroGradient: 'from-red-700 via-rose-700 to-pink-800',
    heroGlow: 'from-red-400 to-rose-400',
    accentFrom: 'from-red-400',
    accentTo: 'to-rose-500',
    accentText: 'text-red-700',
    accentBg: 'bg-red-50',
    accentBorder: 'border-red-200',
    icon: <Heart className="w-5 h-5" />,
    heroIcon: <Heart className="w-10 h-10 text-white" />,
    benefits: ['Hipotensor', 'Vasodilatador', 'Potássio', 'Magnésio', 'Antioxidante', 'Protetor arterial'],
    juices: [
      {
        title: 'Banana Expressa (Hipertensão – 1)',
        description: 'A banana é rica em potássio, que neutraliza o efeito hipertensivo do sódio. O germen de trigo fornece vitaminas B para o bom funcionamento cardíaco.',
        ingredients: ['2 xícaras de leite de arroz (480 ml)', '2 bananas picadas (de preferência banana-da-terra)', '1 manga média picada', '1 colher (sopa) de germen de trigo (6 g)', '¼ colher (chá) de canela em pó (1 g)'],
        properties: 'Potássio, Magnésio, Vitaminas B e C, Hipotensor, Nutritivo.',
        prepTime: '5 min', difficulty: 'Fácil',
      },
      {
        title: 'Gazpacho (Arteriosclerose)',
        description: 'O gazpacho é um caldo frio rico em antioxidantes de tomate, pimentão e azeite. Tomado regularmente, protege as artérias e reduz a oxidação do colesterol LDL.',
        ingredients: ['4 tomates médios (cerca de 360 g)', '1 pepino médio (cerca de 200 g)', '1 pimentão médio, de preferência cor verde (cerca de 100 g)', '½ cebola (cerca de 55 g)', '6 fatias de pão integral (13,5 g cada)', '2 dentes de alho (cerca de 10 g)', '3 colheres (sopa) de azeite de oliva (40 g)', '1 colher (chá) de suco de limão ou vinagre de maçã (15 ml)', '1 xícara (chá) de água (240 ml)', '1 colher (chá) de sal, de preferência sal marinho (5 g)'],
        properties: 'Licopeno, Vitaminas A e C, Betacaroteno, Azeite, Anticancerígeno.',
        prepTime: '15 min', difficulty: 'Médio',
      },
      {
        title: 'Suco de Cenoura (Antioxidante Cardiovascular)',
        description: 'O suco de cenoura é um potente antioxidante que além de proteger os olhos e as mucosas respiratórias, evita que o colesterol se oxide nas artérias.',
        ingredients: ['5 cenouras (cerca de 300 g)', '1 colher (sopa) de suco de limão (15 ml)'],
        properties: 'Betacaroteno, Vitamina A, Antioxidante, Hipocolesterolemiante.',
        prepTime: '5 min', difficulty: 'Fácil',
      },
      {
        title: 'Infusão de Gengibre & Açafrão-da-Terra (Hipotensão)',
        description: 'O gengibre e o açafrão-da-terra (cúrcuma) normalizam a pressão arterial baixa. Também têm efeito anti-inflamatório e tônico sem elevar a pressão além do normal.',
        ingredients: ['½ colher (chá) de gengibre em pó (cerca de 1 g)', '½ colher (chá) de açafrão-da-terra em pó (cerca de 0,7 g)', '2 colheres (sopa) de melado (cerca de 40 g), ou mel', '2 xícaras (chá) de água (240 ml)'],
        properties: 'Regulador da pressão, Anti-inflamatório, Tônico, Gingeróis, Curcumina.',
        prepTime: '10 min', difficulty: 'Fácil',
      },
    ],
    tips: [
      'A Banana Expressa é ideal para o desjejum ou jantar — consumida regularmente regula a pressão arterial.',
      'O Gazpacho deve ser consumido frio e bem gelado — pode ser preparado com antecedência.',
      'O suco de cenoura deve ser tomado imediatamente após o preparo para preservar os betacarotenos.',
      'A infusão de gengibre e açafrão é para hipotensão (pressão baixa) — não usar para hipertensão.',
    ],
  },

  /* ─────────────────────────────────────────────
     SANGUE  (book pp. 84-99)
  ───────────────────────────────────────────── */
  sangue: {
    id: 'sangue',
    label: 'Sangue',
    badge: 'BEBIDAS PARA O SANGUE',
    headline: 'Bebidas para o Sangue',
    subheadline: 'Sucos e shakes antianêmicos, depurativos e reguladores dos níveis de glicose, colesterol e triglicérides no sangue.',
    heroGradient: 'from-rose-700 via-red-800 to-pink-900',
    heroGlow: 'from-rose-400 to-red-400',
    accentFrom: 'from-rose-400',
    accentTo: 'to-red-500',
    accentText: 'text-rose-700',
    accentBg: 'bg-rose-50',
    accentBorder: 'border-rose-200',
    icon: <Droplet className="w-5 h-5" />,
    heroIcon: <Droplet className="w-10 h-10 text-white" />,
    benefits: ['Antianêmico', 'Depurativo', 'Redutor de triglicérides', 'Antidiabético', 'Antioxidante', 'Vitamina C'],
    juices: [
      {
        title: 'Verde Antianêmico (Anemia)',
        description: 'O kiwi é das frutas mais ricas em vitamina C, que favorece a absorção do ferro do espinafre. O abacate fornece gorduras boas e a uva adiciona antioxidantes.',
        ingredients: ['2 kiwis médios (cerca de 140 g)', '½ abacate médio (cerca de 100 g)', '½ xícara de espinafre (cerca de 30 g)', '1 xícara de suco de uva (cerca de 240 ml)', '2 colheres (sopa) de melado ou açúcar mascavo'],
        properties: 'Ferro, Vitaminas C e E, Ácido fólico, Clorofila, Antioxidante.',
        prepTime: '8 min', difficulty: 'Fácil',
      },
      {
        title: 'Super Detox (Limpeza do Sangue)',
        description: 'Clássico dos sucos depurativos: a cenoura e a maçã fornecem vitaminas e enzimas, o salsão tem ação diurética e o limão alcaliniza o sangue.',
        ingredients: ['5 cenouras médias (cerca de 300 g)', '2 maçãs médias (cerca de 320 g)', '4 talos de salsão (cerca de 150 g)', '1 limão médio (cerca de 80 g)'],
        properties: 'Betacaroteno, Vitaminas A e C, Diurético, Depurativo, Alcalinizante.',
        prepTime: '8 min', difficulty: 'Fácil',
      },
      {
        title: 'Shake de Aveia com Morangos (Diabetes)',
        description: 'A aveia tem baixo índice glicêmico e é rica em betaglucanas, fibras que regulam a glicemia. Os morangos e a canela também ajudam a controlar o açúcar no sangue.',
        ingredients: ['4 colheres (sopa) de flocos de aveia (cerca de 20 g)', '1 maçã com casca, se for de produção ecológica (180 g)', '1 xícara de morangos (cerca de 140 g)', '½ colher (chá) de canela em pó (cerca de 1,2 g)', '¾ de xícara de água (cerca de 180 ml)'],
        properties: 'Betaglucanas, Índice glicêmico baixo, Vitamina C, Antidiabético.',
        prepTime: '5 min', difficulty: 'Fácil',
      },
      {
        title: 'Goiaba com Linhaça (Triglicérides)',
        description: 'A goiaba e a linhaça são conhecidas pela capacidade de diminuir a quantidade de gordura (triglicérides) no sangue, reduzindo o risco de ataque cardíaco.',
        ingredients: ['2 xícaras de goiaba descascada e picada (cerca de 330 g), ou 1 xícara de pera', '1 colher (sopa) de sementes de linhaça moídas ou de chia (cerca de 10 g)', '½ xícara de leite de soja (cerca de 240 ml)'],
        properties: 'Ômega-3, Vitaminas C e B3, Reduz triglicérides, Anticancerígeno.',
        prepTime: '5 min', difficulty: 'Fácil',
      },
    ],
    tips: [
      'O Verde Antianêmico é ideal para pessoas com anemia ferropriva — combine com alimentos ricos em ferro (leguminosas, carnes).',
      'O Shake de Aveia é indicado para diabéticos e pessoas com resistência à insulina — adoçar preferencialmente com estévia.',
      'O Super Detox pode ser variado com beterraba, pepino ou gengibre.',
      'A linhaça deve estar moída para liberar seus ômega-3 — compre inteira e moa na hora ou use chia como alternativa.',
    ],
  },

  /* ─────────────────────────────────────────────
     SISTEMA RESPIRATÓRIO  (book pp. 100-107)
  ───────────────────────────────────────────── */
  respiratorio: {
    id: 'respiratorio',
    label: 'Respiratório',
    badge: 'SISTEMA RESPIRATÓRIO',
    headline: 'Bebidas para o Sistema Respiratório',
    subheadline: 'Sucos expectorantes, anti-inflamatórios e broncodilatadores naturais para asma, bronquite, tosse e catarro.',
    heroGradient: 'from-sky-700 via-cyan-700 to-blue-800',
    heroGlow: 'from-sky-400 to-cyan-400',
    accentFrom: 'from-sky-400',
    accentTo: 'to-cyan-500',
    accentText: 'text-sky-700',
    accentBg: 'bg-sky-50',
    accentBorder: 'border-sky-200',
    icon: <Wind className="w-5 h-5" />,
    heroIcon: <Wind className="w-10 h-10 text-white" />,
    benefits: ['Expectorante', 'Anti-inflamatório', 'Broncodilatador', 'Vitamina C', 'Mucolítico', 'Antiviral'],
    juices: [
      {
        title: 'Suco de Erva-doce & Cenoura (Tosse e Catarro)',
        description: 'A erva-doce tem propriedades expectorantes clássicas. A cebola é um potente mucolítico e a cenoura fornece betacaroteno para a saúde das mucosas respiratórias.',
        ingredients: ['1 bulbo de erva-doce (cerca de 230 g)', '½ cebola (cerca de 35 g)', '3 cenouras (cerca de 200 g)', '1 colher (sopa) de mel ou melado (cerca de 21 g)'],
        properties: 'Expectorante, Betacaroteno, Vitamina A, Mucolítico, Vitamina C.',
        prepTime: '8 min', difficulty: 'Fácil',
      },
      {
        title: 'Shake de Banana & Kiwi (Asma)',
        description: 'O kiwi é uma das frutas mais ricas em vitamina C, que reduz a inflamação brônquica. A banana fornece magnésio, que relaxa a musculatura lisa dos brônquios.',
        ingredients: ['1 banana média (pode ser congelada para mais cremosidade)', '1 kiwi (cerca de 70 g)', '1 xícara de suco de maçã (240 ml) — feito em casa ou industrializado', '½ xícara de água (cerca de 120 ml)'],
        properties: 'Vitamina C, Magnésio, Broncodilatador, Antioxidante.',
        prepTime: '5 min', difficulty: 'Fácil',
      },
      {
        title: 'Suco de Lima & Cenoura (Bronquite)',
        description: 'A lima (limão) é rica em vitamina C e bioflavonoides que fortalecem os capilares das mucosas respiratórias. A cenoura e o germen de trigo fornecem nutrientes protetores.',
        ingredients: ['2 limas ou limões (cerca de 130 g)', '4 cenouras médias (cerca de 250 g)', '1 colher (sopa) de germen de trigo (cerca de 6 g)', '1 colher (sopa) de melado (cerca de 20 g) ou rapadura ou açúcar mascavo', '2 folhas de hortelã (cerca de 0,1 g)'],
        properties: 'Vitamina C, Betacaroteno, Bioflavonoides, Expectorante, Vitaminas B.',
        prepTime: '8 min', difficulty: 'Fácil',
      },
    ],
    tips: [
      'O suco de erva-doce e cenoura é ideal tomado quente ou morno para potencializar o efeito expectorante.',
      'Evite leite de vaca quando houver catarro — pode aumentar a produção de muco.',
      'O mel deve ser adicionado após o preparo e nunca aquecido acima de 40°C para preservar suas enzimas.',
      'Combine com inalações de vapor com eucalipto para maximizar o efeito nas vias respiratórias.',
    ],
  },

  /* ─────────────────────────────────────────────
     FÍGADO  (book pp. 108-113)
  ───────────────────────────────────────────── */
  figado: {
    id: 'figado',
    label: 'Fígado',
    badge: 'BEBIDAS PARA O FÍGADO',
    headline: 'Bebidas para o Fígado',
    subheadline: 'Bebidas hepatoprotetoras, colagogas e depurativas para descongestionar, regenerar e fortalecer o fígado e a vesícula biliar.',
    heroGradient: 'from-amber-700 via-yellow-700 to-orange-700',
    heroGlow: 'from-amber-400 to-yellow-400',
    accentFrom: 'from-amber-400',
    accentTo: 'to-orange-500',
    accentText: 'text-amber-700',
    accentBg: 'bg-amber-50',
    accentBorder: 'border-amber-200',
    icon: <Activity className="w-5 h-5" />,
    heroIcon: <Activity className="w-10 h-10 text-white" />,
    benefits: ['Hepatoprotetor', 'Colerético', 'Depurativo', 'Antioxidante', 'Anticirrótico', 'Desintoxicante'],
    juices: [
      {
        title: 'Limpeza Hepática (Repolho Roxo)',
        description: 'Um copo diário desta Limpeza Hepática é indispensável em qualquer tratamento de desintoxicação ou emagrecimento, para regenerar a capacidade depuradora do fígado.',
        ingredients: ['½ xícara de repolho roxo (cerca de 99 g)', '3 cenouras (cerca de 200 g)', '1 maçã com a casca, se for de agricultura ecológica (cerca de 180 g)', '2 colheres (sopa) de suco de limão (cerca de 30 ml)'],
        properties: 'Sulforafano, Betacaroteno, Vitamina C, Depurativo, Anticancerígeno.',
        prepTime: '8 min', difficulty: 'Fácil',
      },
      {
        title: 'Figo-da-Índia & Uvas (Hepatite)',
        description: 'O figo-da-índia é protetor do fígado e possui propriedades anti-inflamatórias comprovadas. As uvas pretas adicionam resveratrol e os rabanetes têm efeito colerético.',
        ingredients: ['1 figo-da-índia (cerca de 105 g). Opções: 2 figos secos (hidratados) ou 1 xícara de goiaba', '1 xícara de uvas (cerca de 150 g), de preferência uvas pretas', '1 toranja rosada (cerca de 166 g), de preferência a rosada', '2 rabanetes (cerca de 18 g)'],
        properties: 'Betanina, Resveratrol, Naringenina, Hepatoprotetor, Colerético.',
        prepTime: '8 min', difficulty: 'Médio',
      },
      {
        title: 'Shake de Erva-doce, Couve & Mamão (Vesícula)',
        description: 'A couve e o mamão estimulam a produção de bile e facilitam a digestão das gorduras. A erva-doce tem ação anti-inflamatória e antiespasmódica sobre as vias biliares.',
        ingredients: ['½ bulbo de erva-doce (cerca de 120 g)', '2 folhas de couve ou de repolho (cerca de 30 g)', '1 mamão pequeno, descascado e sem sementes (cerca de 160 g)', '1 copo de suco de abacaxi (250 ml), sem adoçar'],
        properties: 'Papaína, Bromelina, Clorofila, Colerético, Antiespasmódico.',
        prepTime: '8 min', difficulty: 'Fácil',
      },
    ],
    tips: [
      'A Limpeza Hepática deve ser tomada diariamente, de preferência em jejum de manhã.',
      'Evite álcool, gorduras saturadas e frituras durante tratamentos de desintoxicação hepática.',
      'A toranja (grapefruit) é incompatível com mais de 80 medicamentos — consulte o médico se usar remédios regularmente.',
      'Não use estes sucos em caso de obstrução das vias biliares ou pedras na vesícula sem acompanhamento médico.',
    ],
  },

  /* ─────────────────────────────────────────────
     ESTÔMAGO  (book pp. 114-121)
  ───────────────────────────────────────────── */
  estomago: {
    id: 'estomago',
    label: 'Estômago',
    badge: 'BEBIDAS PARA O ESTÔMAGO',
    headline: 'Bebidas para o Estômago',
    subheadline: 'Shakes e infusões protetores da mucosa gástrica, indicados para gastrite, úlcera, Helicobacter pylori, refluxo e dispepsia.',
    heroGradient: 'from-lime-700 via-green-700 to-emerald-800',
    heroGlow: 'from-lime-400 to-green-400',
    accentFrom: 'from-lime-400',
    accentTo: 'to-green-500',
    accentText: 'text-green-700',
    accentBg: 'bg-green-50',
    accentBorder: 'border-green-200',
    icon: <Apple className="w-5 h-5" />,
    heroIcon: <Apple className="w-10 h-10 text-white" />,
    benefits: ['Protetor da mucosa', 'Anti-Helicobacter', 'Anti-inflamatório', 'Antiulceroso', 'Digestivo', 'Anticancerígeno'],
    juices: [
      {
        title: 'Protetor Vegetal (Helicobacter Pylori)',
        description: 'O brócolis é um poderoso antioxidante gástrico e o mirtilo diminui a aderência da bactéria Helicobacter pylori à mucosa, ajudando a prevenir e tratar a úlcera.',
        ingredients: ['1 ramo de brócolis (cerca de 100 g), preferencialmente cozido a vapor', '1 xícara de suco de abacaxi (240 ml)', '½ xícara de mirtilos (cerca de 150 g), de cor coral ou vermelha'],
        properties: 'Sulforafano, Bromelina, Antocianinas, Anti-Helicobacter, Anticancerígeno.',
        prepTime: '12 min', difficulty: 'Médio',
      },
      {
        title: 'Shake de Erva-doce & Couve & Mamão (Gastrite)',
        description: 'A erva-doce tem propriedades antiespasmódicas e carminativas. O mamão contém papaína que facilita a digestão das proteínas e protege a mucosa.',
        ingredients: ['½ bulbo de erva-doce (cerca de 120 g)', '2 folhas de couve ou de repolho (cerca de 30 g)', '1 mamão pequeno, descascado e sem sementes (cerca de 160 g)', '1 copo de suco de abacaxi (250 ml), sem adoçar'],
        properties: 'Papaína, Bromelina, Flavonoides, Digestivo, Protetor da mucosa.',
        prepTime: '8 min', difficulty: 'Fácil',
      },
      {
        title: 'Suco Verde Gástrico (Úlcera)',
        description: 'A couve crua é rica em glutamina, aminoácido que repara a mucosa gástrica. A batata crua contém mucilagens calmantes para a inflamação do estômago.',
        ingredients: ['4 folhas grandes de couve ou de repolho (cerca de 160 g)', '½ cenouras médias (cerca de 250 g)', '½ batata crua e descascada (cerca de 85 g). Não usar batatas com a casca esverdeada pois podem conter solanina'],
        properties: 'Glutamina, Mucilagens, Vitaminas C e K, Protetor da mucosa.',
        prepTime: '8 min', difficulty: 'Fácil',
      },
      {
        title: 'Infusão Digestiva (Dispepsia e Náuseas)',
        description: 'A menta e a camomila relaxam os músculos que cobrem o intestino e evitam as contrações bruscas (espasmos). A erva-doce reduz a produção de gases.',
        ingredients: ['1 colher (chá) de raízes secas e trituradas de alcaçuz (Glycyrrhiza glabra)', '½ colher (chá) de sementes de erva-doce (Pimpinella anisum)', '½ colher (chá) de gengibre ralado (Zingiber officinale)', '1 xícara de água (250 ml)'],
        properties: 'Digestiva, Carminativa, Antiemética, Alivia náuseas, Antiespasmódica.',
        prepTime: '10 min', difficulty: 'Fácil',
      },
    ],
    tips: [
      'O Protetor Vegetal pode ser tomado diariamente por um a dois meses como preventivo ou coadjuvante.',
      'O Suco Verde Gástrico é indicado especialmente em jejum, 30 min antes do café da manhã.',
      'Adoçar a gosto — de preferência com estévia, que não fermenta no estômago.',
      'Evite pimenta, vinagre e frituras durante o tratamento de gastrite ou úlcera.',
    ],
  },

  /* ─────────────────────────────────────────────
     INTESTINO  (book pp. 122-135)
  ───────────────────────────────────────────── */
  intestino: {
    id: 'intestino',
    label: 'Intestino',
    badge: 'BEBIDAS PARA O INTESTINO',
    headline: 'Bebidas para o Intestino',
    subheadline: 'Sucos laxantes, reguladores do trânsito intestinal e antiespasmódicos para constipação, colite, intestino irritável e diarreia.',
    heroGradient: 'from-teal-700 via-cyan-700 to-emerald-800',
    heroGlow: 'from-teal-400 to-cyan-400',
    accentFrom: 'from-teal-400',
    accentTo: 'to-cyan-500',
    accentText: 'text-teal-700',
    accentBg: 'bg-teal-50',
    accentBorder: 'border-teal-200',
    icon: <Leaf className="w-5 h-5" />,
    heroIcon: <Leaf className="w-10 h-10 text-white" />,
    benefits: ['Laxante suave', 'Fibras solúveis', 'Probióticos', 'Antiespasmódico', 'Regulador', 'Carminativo'],
    juices: [
      {
        title: 'Shake Laxante (Constipação)',
        description: 'Ameixas e figos secos hidratados são os laxantes naturais mais eficazes. O kiwi acrescenta enzimas digestivas e vitamina C para este clássico da regulação intestinal.',
        ingredients: ['4 ameixas secas sem caroço (cerca de 40 g)', '4 figos secos (cerca de 34 g). Se possível, usar figos frescos; nesse caso não há necessidade de hidratá-los', '1 kiwi médio sem a casca (cerca de 70 g)', '1 copo de suco de laranja (250 ml)'],
        properties: 'Fibras insolúveis, Sorbitol, Vitamina C, Laxante natural.',
        prepTime: '10 min', difficulty: 'Fácil',
      },
      {
        title: 'Água de Arroz (Diarreia e Intestino Delicado)',
        description: 'A água de arroz é adstringente e calmante para o intestino inflamado. É indicada para diarreia, gastroenterite e intestino delicado. Muito bem tolerada por crianças.',
        ingredients: ['1 xícara de arroz branco cru (cerca de 200 g)', '3 xícaras de água (cerca de 1,5 litro)', '1 xícara de leite de soja (240 ml)', '1 xícara de coco ralado (cerca de 80 g)', '1 colher (chá) de canela em pó', '1 colher (sopa) de casca de limão ralada (cerca de 6 g)'],
        properties: 'Adstringente, Calmante intestinal, Energia de digestão fácil.',
        prepTime: '20 min', difficulty: 'Médio',
      },
      {
        title: 'Shake de Morangos & Linhaça (Intestino Irritável)',
        description: 'A linhaça forma um gel suave que lubrifica e protege as paredes do intestino. A menta relaxa a musculatura intestinal, aliviando cólicas e espasmos.',
        ingredients: ['1 xícara de morangos (cerca de 144 g)', '2 colheres (sopa) de sementes de linhaça ou de chia moídas (cerca de 20 g)', '1 xícara de leite de arroz (240 ml)', '4 folhas de menta (cerca de 0,2 g)'],
        properties: 'Ômega-3, Fibras solúveis, Mucilagens, Antiespasmódico.',
        prepTime: '5 min', difficulty: 'Fácil',
      },
      {
        title: 'Infusão Antiespasmódica (Cólon Irritável)',
        description: 'A menta ou hortelã-pimenta, a camomila e a erva-doce relaxam os músculos intestinais e evitam as contrações bruscas típicas do cólon irritável e das flatulências.',
        ingredients: ['4 folhas de menta (cerca de 0,2 g)', '1 colher (chá) de erva-doce (cerca de 3 g)', '1 colher (chá) de camomila'],
        properties: 'Antiespasmódica, Carminativa, Antiflatulência, Digestiva.',
        prepTime: '8 min', difficulty: 'Fácil',
      },
    ],
    tips: [
      'O Shake Laxante é ideal tomado em jejum pela manhã para estimular o trânsito intestinal.',
      'A Água de Arroz pode ser guardada na geladeira por até 3 dias — tomar de 2 a 3 xícaras por dia na diarreia.',
      'A linhaça e a chia devem estar moídas para liberar suas mucilagens e ômega-3.',
      'Aumente gradualmente a ingestão de fibras para evitar gases e desconforto intestinal.',
    ],
  },

  /* ─────────────────────────────────────────────
     APARELHO URINÁRIO  (book pp. 136-143)
  ───────────────────────────────────────────── */
  urinario: {
    id: 'urinario',
    label: 'Ap. Urinário',
    badge: 'APARELHO URINÁRIO',
    headline: 'Bebidas para o Aparelho Urinário',
    subheadline: 'Sucos diuréticos, antissépticos das vias urinárias e preventivos de pedras nos rins, indicados para cistite, uretrite e infecção urinária.',
    heroGradient: 'from-blue-700 via-indigo-700 to-violet-800',
    heroGlow: 'from-blue-400 to-indigo-400',
    accentFrom: 'from-blue-400',
    accentTo: 'to-indigo-500',
    accentText: 'text-blue-700',
    accentBg: 'bg-blue-50',
    accentBorder: 'border-blue-200',
    icon: <Droplet className="w-5 h-5" />,
    heroIcon: <Droplet className="w-10 h-10 text-white" />,
    benefits: ['Diurético', 'Antisséptico urinário', 'Alcalinizante', 'Preventivo de cálculos', 'Vitamina C', 'Anti-inflamatório'],
    juices: [
      {
        title: 'Suco de Melancia & Aspargos (Retenção de Líquidos)',
        description: 'A melancia tem 92% de água e contém citrulina, que aumenta a produção de urina. Os aspargos contêm asparagina, aminoácido com potente efeito diurético.',
        ingredients: ['4 xícaras de melancia cortada em pedaços, sem casca e sem sementes (cerca de 600 g)', '4 aspargos de tamanho médio (cerca de 60 g)', '2 talos de salsão de tamanho médio (cerca de 80 g)', '1 colher (sopa) de melado (cerca de 20 g), ou açúcar mascavo ou xarope de bordo'],
        properties: 'Citrulina, Asparagina, Diurético, Vitaminas A e C, Alcalinizante.',
        prepTime: '8 min', difficulty: 'Fácil',
      },
      {
        title: 'Shake de Mirtilos (Cistite e Infecção Urinária)',
        description: 'Os mirtilos contêm proantocianidinas que impedem as bactérias E. coli de aderir às paredes da bexiga. É um dos remédios naturais mais eficazes para infecção urinária.',
        ingredients: ['1 xícara de mirtilos (cerca de 148 g) ou 1 xícara de suco de mirtilos (de preferência sem açúcar), ou jabuticabas', '½ xícara de leite de coco (cerca de 120 ml)', '1 copo de água (250 ml)', '2 colheres (sopa) de suco de limão (cerca de 30 ml)'],
        properties: 'Proantocianidinas, Antisséptico urinário, Vitamina C, Anti-Escherichia coli.',
        prepTime: '5 min', difficulty: 'Fácil',
      },
      {
        title: 'Suco de Couve & Água de Coco (Alcalinizante)',
        description: 'A couve e a água de coco alcalinizam a urina, criando um ambiente desfavorável ao crescimento bacteriano e à formação de cálculos de ácido úrico.',
        ingredients: ['2 xícaras (chá) de couve ou folhas verdes de acelga (cerca de 60 g)', '1½ xícara (chá) de água de coco (cerca de 350 ml)', '1 limão espremido (cerca de 44 ml de suco)'],
        properties: 'Alcalinizante, Vitamina K, Clorofila, Eletrólitos, Diurético.',
        prepTime: '5 min', difficulty: 'Fácil',
      },
    ],
    tips: [
      'O Shake de Mirtilos é mais eficaz como preventivo — tomar diariamente em pessoas com propensão a infecções urinárias.',
      'Beba pelo menos 2 litros de água por dia para manter as vias urinárias limpas.',
      'Evite café, álcool e bebidas açucaradas durante infecções urinárias — eles irritam a bexiga.',
      'Adoçar a gosto com estévia, preferencialmente com um adoçante não calórico.',
    ],
  },

  /* ─────────────────────────────────────────────
     APARELHO REPRODUTOR  (book pp. 144-165)
  ───────────────────────────────────────────── */
  reprodutor: {
    id: 'reprodutor',
    label: 'Ap. Reprodutor',
    badge: 'APARELHO REPRODUTOR',
    headline: 'Bebidas para o Aparelho Reprodutor',
    subheadline: 'Sucos e shakes com fitoquímicos que equilibram hormônios, melhoram a fertilidade e protegem contra doenças do sistema reprodutor masculino e feminino.',
    heroGradient: 'from-fuchsia-700 via-pink-700 to-rose-800',
    heroGlow: 'from-fuchsia-400 to-pink-400',
    accentFrom: 'from-fuchsia-400',
    accentTo: 'to-pink-500',
    accentText: 'text-fuchsia-700',
    accentBg: 'bg-fuchsia-50',
    accentBorder: 'border-fuchsia-200',
    icon: <Baby className="w-5 h-5" />,
    heroIcon: <Baby className="w-10 h-10 text-white" />,
    benefits: ['Hormonal', 'Antioxidante', 'Fertilidade', 'Protetor da próstata', 'Fitoestrogênios', 'Zinco'],
    juices: [
      {
        title: 'Suco de Romã & Maracujá (Menopausa e Fertilidade)',
        description: 'A romã contém fitoestrogênios que ajudam a equilibrar os hormônios femininos na menopausa. A maca peruana é adaptógena e favorece a fertilidade masculina e feminina.',
        ingredients: ['1 romã (cerca de 262 g), ou ½ xícara de suco de romã (120 ml)', '2 maracujás (cerca de 140 g)', '1 colher (chá) de maca peruana em pó (cerca de 4 g), ou 1 colher (sopa) de sementes de abóbora trituradas'],
        properties: 'Fitoestrogênios, Ácido elágico, Adaptógeno, Zinco, Antioxidante.',
        prepTime: '8 min', difficulty: 'Médio',
      },
      {
        title: 'Shake de Abacate & Castanhas (Fertilidade Masculina)',
        description: 'As castanhas-do-pará são a maior fonte alimentar de selênio, mineral essencial para a produção de espermatozoides. O abacate e o germen de trigo fornecem vitamina E.',
        ingredients: ['½ abacate (cerca de 100 g)', '6 castanhas-do-pará (cerca de 30 g) ou nozes', '1½ xícara de suco de laranja (360 ml)', '2 colheres (sopa) de germen de trigo (cerca de 12 g)', '2 colheres (sopa) de suco de limão (30 ml)'],
        properties: 'Selênio, Vitamina E, Ômega-9, Zinco, Vitamina C.',
        prepTime: '8 min', difficulty: 'Fácil',
      },
      {
        title: 'Suco de Beterraba & Aspargos (Libido e Circulação)',
        description: 'A beterraba aumenta a produção de óxido nítrico, vasodilatador que melhora a circulação pélvica. Os aspargos são ricos em ácido fólico, essencial na gravidez.',
        ingredients: ['1 beterraba (cerca de 280 g)', '10 aspargos (cerca de 200 g)', '1 colher (chá) de gengibre ralado fresco ou em pó (cerca de 2 g)', '1 colher (sopa) de melado (cerca de 40 g) ou açúcar mascavo', '½ xícara de água (120 ml)'],
        properties: 'Nitratos, Ácido fólico, Vitamina B9, Vasodilatador, Antioxidante.',
        prepTime: '8 min', difficulty: 'Fácil',
      },
      {
        title: 'Suco de Couve-flor & Linhaça (Saúde Hormonal)',
        description: 'A couve-flor contém indol-3-carbinol que metaboliza os estrogênios excessivos. A linhaça tem lignanas, fitoestrogênios que protegem contra câncer hormonal.',
        ingredients: ['1 couve-flor pequena (cerca de 265 g)', '2 tomates médios (cerca de 450 g)', '2 colheres (sopa) de sementes de linhaça ou chia moídas (cerca de 20,6 g)', '4 raminhos de salsa (cerca de 4 g)', '1 colher (chá) de sal marinho (cerca de 3 g), de preferência sal marinho'],
        properties: 'Indol-3-carbinol, Lignanas, Fitoestrogênios, Vitamina C, Anticancerígeno.',
        prepTime: '10 min', difficulty: 'Fácil',
      },
    ],
    tips: [
      'A maca peruana potencializa o efeito hormonal da romã — não usar sem orientação médica em caso de câncer hormonal.',
      'As castanhas-do-pará devem ser consumidas sem exagero — 2 a 3 unidades por dia já fornecem 100% do selênio diário.',
      'O ácido fólico dos aspargos é especialmente importante para mulheres em idade fértil e na gestação.',
      'Combine estes sucos com exercícios físicos regulares para potencializar o equilíbrio hormonal.',
    ],
  },

  /* ─────────────────────────────────────────────
     METABOLISMO  (book pp. 166-181)
  ───────────────────────────────────────────── */
  metabolismo: {
    id: 'metabolismo',
    label: 'Metabolismo',
    badge: 'METABOLISMO & PESO',
    headline: 'Bebidas para o Metabolismo',
    subheadline: 'Bebidas termogênicas, depurativas e reguladoras do metabolismo para controle de peso, hipotiroidismo, obesidade e diabetes.',
    heroGradient: 'from-orange-600 via-amber-600 to-yellow-700',
    heroGlow: 'from-orange-400 to-amber-400',
    accentFrom: 'from-orange-400',
    accentTo: 'to-amber-500',
    accentText: 'text-orange-700',
    accentBg: 'bg-orange-50',
    accentBorder: 'border-orange-200',
    icon: <Zap className="w-5 h-5" />,
    heroIcon: <Zap className="w-10 h-10 text-white" />,
    benefits: ['Termogênico', 'Regulador metabólico', 'Emagrecedor', 'Antidiabético', 'Fibras', 'Vitaminas B'],
    juices: [
      {
        title: 'Suco de Mamão & Abacaxi & Hibisco (Emagrecimento)',
        description: 'O hibisco inibe enzimas que acumulam gordura. O mamão com abacaxi fornece papaína e bromelina, enzimas digestivas que aceleram o metabolismo das proteínas.',
        ingredients: ['2 xícaras de mamão sem casca, em pedaços (cerca de 290 g)', '½ xícara de suco de abacaxi (cerca de 120 ml)', '½ xícara de chá de hibisco (cerca de 120 ml)'],
        properties: 'Papaína, Bromelina, Antocianinas, Termogênico, Emagrecedor.',
        prepTime: '8 min', difficulty: 'Fácil',
      },
      {
        title: 'Shake Emagrecedor de Soja & Aveia',
        description: 'A farinha de aveia e o leite de soja fornecem proteínas e fibras de baixo índice glicêmico que saciam e regulam o metabolismo. As tâmaras adicionam energia de qualidade.',
        ingredients: ['1½ xícara de leite de soja (cerca de 360 ml)', '2 colheres (sopa) de farinha de aveia (cerca de 12 g)', '4 tâmaras ou figos (cerca de 28 g)', '2 colheres (sopa) de creme de amêndoas, ou tahine (pasta de gergelim ou creme de amendoim) (cerca de 60 g)', '8 morangos médios (cerca de 100 g)', '1 colher (sopa) de melado (cerca de 20 g) ou açúcar mascavo'],
        properties: 'Proteínas vegetais, Betaglucanas, Fibras solúveis, Emagrecedor.',
        prepTime: '5 min', difficulty: 'Fácil',
      },
      {
        title: 'Verde do Metabolismo (Hipotiroidismo)',
        description: 'A couve, o espinafre e o brócolis fornecem vitaminas e minerais essenciais para o bom funcionamento da tiroide e o metabolismo celular. A maçã regula a glicemia.',
        ingredients: ['1 xícara de couve sem o talo picada (cerca de 67 g), equivalente a duas folhas de tamanho médio', '1 xícara de espinafre (cerca de 30 g)', '1 ramo de brócolis (cerca de 50 g)', '1 maçã (com casca) de tamanho médio (cerca de 182 g). Observar as sementes.', '4 colheres (sopa) de suco de limão (cerca de 30 g)'],
        properties: 'Iodo, Selênio, Vitaminas B, C e K, Clorofila, Regulador tiroidal.',
        prepTime: '8 min', difficulty: 'Fácil',
      },
    ],
    tips: [
      'O Shake Emagrecedor pode substituir uma refeição leve — tomar no café da manhã ou lanche da tarde.',
      'O chá de hibisco não deve ser consumido em excesso por gestantes.',
      'O Verde do Metabolismo é melhor tomado pela manhã para estimular o metabolismo durante o dia.',
      'Combine estes sucos com atividade física regular — o metabolismo é acelerado pela combinação dos dois.',
    ],
  },

  /* ─────────────────────────────────────────────
     APARELHO LOCOMOTOR  (book pp. 182-193)
  ───────────────────────────────────────────── */
  locomotor: {
    id: 'locomotor',
    label: 'Ap. Locomotor',
    badge: 'APARELHO LOCOMOTOR',
    headline: 'Bebidas para o Aparelho Locomotor',
    subheadline: 'Sucos anti-inflamatórios, remineralizantes e protetores das articulações para artrite, artrose, osteoporose e dores musculares.',
    heroGradient: 'from-emerald-700 via-green-700 to-teal-800',
    heroGlow: 'from-emerald-400 to-green-400',
    accentFrom: 'from-emerald-400',
    accentTo: 'to-green-500',
    accentText: 'text-emerald-700',
    accentBg: 'bg-emerald-50',
    accentBorder: 'border-emerald-200',
    icon: <Bone className="w-5 h-5" />,
    heroIcon: <Bone className="w-10 h-10 text-white" />,
    benefits: ['Anti-inflamatório', 'Remineralizante', 'Antiartrítico', 'Alcalinizante', 'Vitamina D', 'Cálcio'],
    juices: [
      {
        title: 'Shake Tonificante de Soja & Morangos (Fadiga Muscular)',
        description: 'O iogurte de soja fornece proteínas para a recuperação muscular. O suco de abacaxi contém bromelina, anti-inflamatório natural para músculos e articulações.',
        ingredients: ['1 iogurte de soja (cerca de 150 g)', '1 xícara de morangos (cerca de 144 g)', '1½ xícara de suco de abacaxi (240 ml)', '2 colheres (sopa) de creme de amêndoas (cerca de 15 g)'],
        properties: 'Proteínas vegetais, Bromelina, Vitamina C, Tonificante, Emagrecedor.',
        prepTime: '5 min', difficulty: 'Fácil',
      },
      {
        title: 'Suco Verde Alcalinizante (Osteoporose e Artrite)',
        description: 'A alcalinização é sinônimo de saúde: bebidas alcalinizantes neutralizam a acidez que desgasta os ossos e as articulações, prevenindo a artrite e a osteoporose.',
        ingredients: ['2 xícaras de espinafre (cerca de 60 g)', '1 xícara de couve sem o talo ou folhas verdes de acelga (cerca de 67 g)', '1 bulbo de erva-doce (cerca de 230 g)', '1 xícara de suco de abacaxi (240 ml)', '2 folhas de hortelã (cerca de 0,10 g)'],
        properties: 'Cálcio, Vitamina K, Magnésio, Alcalinizante, Antioxidante.',
        prepTime: '8 min', difficulty: 'Fácil',
      },
      {
        title: 'Suco de Caju (Tonificante e Emagrecedor)',
        description: 'O suco de caju melhora o rendimento físico e acelera a queima de gorduras enquanto se pratica exercícios físicos, sem o risco de doping. Também combate o cansaço.',
        ingredients: ['Fruto do cajueiro (a parte carnosa laranja/vermelha, não a castanha)', 'Preparar por centrifugação do fruto, embora possa ser encontrado industrializado'],
        properties: 'Vitamina C, Tonificante, Emagrecedor, Aumenta rendimento físico.',
        prepTime: '5 min', difficulty: 'Fácil',
      },
      {
        title: 'Infusão de Cúrcuma (Artrite e Pedras nos Rins)',
        description: 'A cúrcuma (açafrão-da-terra) é um dos produtos vegetais mais estudados. Demonstrou-se tão eficaz quanto o ibuprofeno em caso de inflamação nos joelhos, com menos efeitos colaterais.',
        ingredients: ['½ colher (chá) de cúrcuma em pó (cerca de 0,7 g)', '1 xícara de água (240 ml)', '1 colher (sopa) de suco de limão (cerca de 15 ml)'],
        properties: 'Curcumina, Anti-inflamatório, Neuroprotetor, Hepatoprotetor, Anticancerígeno.',
        prepTime: '5 min', difficulty: 'Fácil',
      },
    ],
    tips: [
      'A Infusão de Cúrcuma pode ser tomada de uma a três xícaras por dia — adicionar pimenta-preta potencializa a absorção da curcumina em 2000%.',
      'O Suco Verde Alcalinizante é especialmente importante para pessoas que consomem muita carne e produtos de origem animal.',
      'O Shake Tonificante é ideal como pré ou pós-treino para atletas e praticantes de exercícios físicos.',
      'Atenção: a cúrcuma pode interferir com anticoagulantes — consulte o médico se usar warfarina ou outros remédios.',
    ],
  },

  /* ─────────────────────────────────────────────
     PELE  (book pp. 194-201)
  ───────────────────────────────────────────── */
  pele: {
    id: 'pele',
    label: 'Pele',
    badge: 'BEBIDAS PARA A PELE',
    headline: 'Bebidas para a Pele',
    subheadline: 'Sucos e extratos com vitaminas A, C, E e silício orgânico que nutrem, cicatrizam e protegem a pele de dentro para fora.',
    heroGradient: 'from-pink-600 via-rose-600 to-fuchsia-700',
    heroGlow: 'from-pink-400 to-rose-400',
    accentFrom: 'from-pink-400',
    accentTo: 'to-rose-500',
    accentText: 'text-rose-700',
    accentBg: 'bg-rose-50',
    accentBorder: 'border-rose-200',
    icon: <Sparkles className="w-5 h-5" />,
    heroIcon: <Sparkles className="w-10 h-10 text-white" />,
    benefits: ['Vitamina C', 'Betacaroteno', 'Vitamina E', 'Silício', 'Cicatrizante', 'Antiacne', 'Colágeno'],
    juices: [
      {
        title: 'Verde da Pele (Pepino & Salsão)',
        description: 'O pepino é 96% água e contém silício orgânico, mineral essencial para a firmeza da pele e a síntese de colágeno. O salsão tem ação desinfetante e anti-inflamatória cutânea.',
        ingredients: ['1 pepino de tamanho médio (cerca de 200 g)', '4 talos de salsão (cerca de 250 g)', '1 xícara de suco de abacaxi (cerca de 240 ml)'],
        properties: 'Silício orgânico, Vitamina K, Diurético, Anti-inflamatório, Bromelina.',
        prepTime: '5 min', difficulty: 'Fácil',
      },
      {
        title: 'Suco de Erva-doce & Cenoura (Betacaroteno)',
        description: 'A cenoura é a maior fonte de betacaroteno, que o organismo converte em vitamina A — essencial para a renovação celular da pele. A erva-doce adiciona flavonoides anti-inflamatórios.',
        ingredients: ['1 bulbo de erva-doce (cerca de 230 g)', '½ cebola (cerca de 35 g)', '3 cenouras (cerca de 200 g)', '1 colher (sopa) de mel ou melado (cerca de 21 g)'],
        properties: 'Betacaroteno, Vitamina A, Flavonoides, Anti-inflamatório, Antioxidante.',
        prepTime: '8 min', difficulty: 'Fácil',
      },
      {
        title: 'Suco de Aloe Vera (Babosa) (Psoríase e Acne)',
        description: 'A babosa tomada por via oral apresenta inúmeros benefícios cutâneos: desinfeta, cicatriza, combate infecções da pele, acne, celulite e psoríase.',
        ingredients: ['Várias folhas da planta Aloe vera (babosa)', 'Suco de limão a gosto (uma ou duas colheres por copo)', 'Água a gosto', 'Adoçante a gosto'],
        properties: 'Acemanano, Mucilagem, Desinfetante, Cicatrizante, Anti-inflamatório.',
        prepTime: '15 min', difficulty: 'Médio',
      },
      {
        title: 'Shake de Kiwi & Abacate (Colágeno)',
        description: 'O kiwi é uma das frutas mais ricas em vitamina C — cofator essencial para a síntese de colágeno. O abacate fornece vitamina E e ácidos graxos que nutrem a pele.',
        ingredients: ['2 kiwis médios (cerca de 140 g)', '½ abacate médio (cerca de 100 g)', '½ xícara de espinafre (cerca de 30 g)', '1 xícara de suco de uva (cerca de 240 ml)', '2 colheres (sopa) de melado ou açúcar mascavo'],
        properties: 'Vitaminas C e E, Ácidos graxos essenciais, Clorofila, Colágeno vegetal.',
        prepTime: '8 min', difficulty: 'Fácil',
      },
    ],
    tips: [
      'O Suco de Aloe Vera deve ser tomado de um a dois copos de 125 ml por dia, preferencialmente antes das refeições.',
      'A vitamina E do abacate age em sinergia com a vitamina C do kiwi — consuma juntos para potencializar a síntese de colágeno.',
      'Para infecções cutâneas, a aloe vera pode ser aplicada diretamente sobre a pele além de consumida por via oral.',
      'Evite açúcar refinado — a glicação destrói fibras de colágeno e acelera o envelhecimento da pele.',
    ],
  },

  /* ─────────────────────────────────────────────
     SISTEMA IMUNOLÓGICO  (book pp. 202-215)
  ───────────────────────────────────────────── */
  imunologico: {
    id: 'imunologico',
    label: 'Imunológico',
    badge: 'SISTEMA IMUNOLÓGICO',
    headline: 'Bebidas para o Sistema Imunológico',
    subheadline: 'Sucos, shakes e infusões com vitamina C, antocianinas e fitoquímicos que estimulam as células de defesa e fortalecem as defesas naturais do organismo.',
    heroGradient: 'from-orange-600 via-amber-600 to-yellow-700',
    heroGlow: 'from-orange-400 to-amber-400',
    accentFrom: 'from-orange-400',
    accentTo: 'to-amber-500',
    accentText: 'text-orange-700',
    accentBg: 'bg-orange-50',
    accentBorder: 'border-orange-200',
    icon: <Shield className="w-5 h-5" />,
    heroIcon: <Shield className="w-10 h-10 text-white" />,
    benefits: ['Vitamina C', 'Antocianinas', 'Antiviral', 'Imunoestimulante', 'Antioxidante', 'Alicina'],
    juices: [
      {
        title: 'Shake de Mirtilos & Repolho Roxo (Imunidade)',
        description: 'As antocianinas dos mirtilos e o repolho roxo possuem alto poder antioxidante, estimulando as células NK (natural killer) do sistema imunológico.',
        ingredients: ['1 xícara de mirtilos (cerca de 150 g). Opções: suco de mirtilos ou açaí', '1 xícara de leite de coco (cerca de 240 ml)', '3 colheres (sopa) de suco de limão (45 ml)', '2 xícaras de repolho roxo (cerca de 180 g)'],
        properties: 'Antocianinas, Vitaminas C e K, Imunoestimulante, Potente antioxidante.',
        prepTime: '5 min', difficulty: 'Fácil',
      },
      {
        title: 'Suco Imunizante de Limão & Alho (Gripes e Resfriados)',
        description: 'O alho cru contém alicina, com potente ação antiviral e antibacteriana. O limão fornece vitamina C e o gengibre tem ação imunoestimulante e anti-inflamatória.',
        ingredients: ['3 limões espremidos (cerca de 90 g)', '1 colher (sopa) de casca de limão ralada', '2 xícaras de suco de laranja (cerca de 500 ml)', '4 dentes de alho cru (cerca de 10 g)', '1 colher (chá) de gengibre ralado (cerca de 2 g)', '¼ colher (chá) de pimenta-caiena (cerca de 1,5 g)', '1 colher (sopa) de mel (cerca de 20 g)'],
        properties: 'Alicina, Vitamina C, Gingeróis, Capsaicina, Antiviral, Antibacteriano.',
        prepTime: '8 min', difficulty: 'Fácil',
      },
      {
        title: 'Suco de Tangerina & Abacaxi & Maçã (Prevenção)',
        description: 'Uma combinação equilibrada e saborosa de frutas ricas em vitamina C, bromelina e quercetina para consumo diário como preventivo e fortalecedor do sistema imune.',
        ingredients: ['4 tangerinas médias sem sementes (cerca de 260 g)', '2 rodelas grandes de abacaxi (cerca de 320 g)', '1 maçã média (cerca de 180 g)'],
        properties: 'Vitamina C, Bromelina, Quercetina, Imunoestimulante, Antioxidante.',
        prepTime: '5 min', difficulty: 'Fácil',
      },
      {
        title: 'Shake de Amoras & Mirtilos & Germen (Defesas)',
        description: 'Uma combinação de berries ricos em compostos fenólicos, tâmaras e germen de trigo para nutrir e fortalecer o sistema imune a longo prazo.',
        ingredients: ['2 xícaras de leite de aveia ou quinoa (480 ml)', '½ xícara de amoras frescas', '½ xícara de mirtilos frescos ou goji berry (cerca de 74 g)', '½ xícara de morangos ou goiaba (cerca de 70 g)', '1 colher (sopa) de germen de trigo (cerca de 10 g)', '2 tâmaras sem caroço (cerca de 30 g)', '6 nozes ou castanha-do-pará (cerca de 30 g)'],
        properties: 'Vitaminas C e E, Selênio, Zinco, Ácidos graxos, Antioxidante.',
        prepTime: '8 min', difficulty: 'Fácil',
      },
    ],
    tips: [
      'O alho perde parte do seu poder antiviral quando aquecido — use-o sempre cru nos sucos.',
      'Beba os sucos frescos imediatamente — a vitamina C se oxida rapidamente após o preparo.',
      'Consuma diariamente, especialmente em períodos de mudança de temperatura ou de estresse.',
      'Atenção: o suco de toranja (grapefruit) é incompatível com mais de 80 medicamentos.',
    ],
  },
};

// Conveniência: array de IDs na ordem do livro
export const THEME_IDS_ORDERED = [
  'nervo', 'cardiovascular', 'sangue', 'respiratorio',
  'figado', 'estomago', 'intestino', 'urinario',
  'reprodutor', 'metabolismo', 'locomotor', 'pele', 'imunologico',
];
