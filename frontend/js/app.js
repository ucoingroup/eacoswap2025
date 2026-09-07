// ===== I18N Translations =====
const I18N = {
  en: {
    hero_title:"EACOswap",hero_sub:"Solana DEX Navigation Hub - Exchange EACO for SOL, USDT, USDC, wBNB, TRX, wETH, wBTC, eCNH all on-chain",
    search_ph:"Search DEX or token...",search_btn:"Search",auto_update:"Auto-updating weekly/monthly",
    connect_wallet:"Connect Wallet",disconnect_wallet:"Disconnect",wallet_title:"Connect Solana Wallet",close:"Close",
    swap_quote_title:"EACO Swap Quote Calculator",swap_input_label:"You pay (EACO)",swap_output_label:"You receive",
    get_quote:"Get Quote",quote_output:"Output:",quote_slippage:"Slippage:",quote_route:"Route:",quote_price_impact:"Price Impact:",
    quote_loading:"Loading quote...",quote_error_prefix:"Quote error: ",
    use_server_proxy:"Use Server Proxy (recommended)",use_server_proxy_hint:"Routes all Helius RPC calls through backend /api/helius/*",
    dex_title:"Top 10 Solana DEXs",dex_desc:"Global leading DEX platforms supporting Solana chain and EACO token trading",
    exchange_title:"EACO Exchange Hub",exchange_desc:"EACO can be swapped for the following tokens, all on Solana chain. Click any token to view on OrbMarkets.",
    tab_all:"All Pairs",tab_stable:"Stablecoins",tab_wrapped:"Wrapped Assets",tab_native:"Native",
    exchange_methods:"How to Exchange EACO",
    method_1:"Method 1: Jupiter Aggregator",method_1_d:"Visit jup.ag, select EACO as input token, choose output token, Jupiter routes through best-priced pools.",
    method_2:"Method 2: Raydium AMM",method_2_d:"Visit raydium.io, use Swap feature, EACO pairs available in CLMM and AMM pools.",
    method_3:"Method 3: Orca Whirlpool",method_3_d:"Visit orca.so, concentrated liquidity pools for tighter spreads on EACO pairs.",
    method_4:"Method 4: Meteora DLMM",method_4_d:"Visit meteora.ag, dynamic liquidity market maker for optimal EACO swap rates.",
    method_5:"Method 5: Phoenix Orderbook",method_5_d:"Visit phoenix.finance, on-chain orderbook DEX for limit orders on EACO.",
    method_6:"Method 6: Direct OrbMarkets",method_6_d:"Use orbmarkets.io token pages for real-time pricing and direct swap links.",
    mcap_title:"SOL Chain Token Market Cap Rankings",mcap_desc:"Top SPL tokens by market capitalization. Data updates weekly and monthly via OrbMarkets developer tools.",
    mcap_top100:"Top 100",mcap_top1000:"Top 1000",mcap_top10000:"Top 10000",
    period_label:"Timeframe:",period_weekly:"Weekly",period_monthly:"Monthly",period_daily:"Daily",
    last_update:"Last update:",next_update:"Next refresh:",
    api_error:"API temporarily unavailable. Please check:",mcap_more:"Showing partial data. View full list:",
    th_token:"Token",th_symbol:"Symbol",th_price:"Price",th_mcap:"Market Cap",th_vol:"24h Volume",th_chg:"Change",th_link:"Links",
    loading:"Loading token data...",
    eaco_title:"EACO - Earth Chain Token",eaco_desc:"EACO (Earth Coin) is a Solana-chain token dedicated to leveraging global surplus labor for value exchange, quantifying Earth resources, and protecting our planet.",
    eaco_basic:"Basic Information",eaco_chain:"Chain:",eaco_contract:"Contract:",eaco_symbol:"Symbol:",eaco_type:"Type:",eaco_vision:"Vision:",eaco_vision_v:"eaco for earth",
    eaco_mission:"Mission:",eaco_mission_v:"Leverage global surplus labor for value exchange",
    eaco_resources:"Resources & Links",eaco_resources_d:"Explore EACO on these platforms:",
    dev_title:"Developer Tools & Auto-Update",dev_desc:"Integrated with OrbMarkets API and Solana data sources for weekly/monthly automatic token information updates.",
    dev_orb_d:"Fetch real-time token data, prices, and market cap from OrbMarkets.",
    dev_helius_d:"High-performance Solana RPC by Helius (Free tier: 1M credits/month). Use server proxy or configure your own key.",
    dev_jup_d:"Get best swap prices across all Solana DEX pools.",
    dev_bird_d:"Comprehensive token market data and analytics.",
    dev_cron:"Hourly/Weekly/Monthly Cron",dev_cron_d:"Scheduled fetch of top 100/1000/10000 SPL tokens, stored in browser localStorage.",
    dev_dexs:"DEX Aggregator",dev_dexs_d:"Jupiter routes EACO swaps through Raydium, Orca, Meteora, Phoenix and more.",
    charity_title:"EACO Public Welfare 2025",charity_desc:"Protecting the Earth is a shared emotional value. Join the EACO public welfare initiative.",
    charity_link:"Enter EACO Public Welfare 2025",
    theme_cosmic:"Cosmic",theme_army:"Army",theme_classic:"Classic",
    footer_dex:"Top DEXs",footer_exchange:"EACO Exchange",footer_mcap:"Market Rankings",footer_eaco:"EACO Info",footer_dev:"Developer Tools",
    footer_tokens:"Tokens",footer_dex_list:"DEX List",footer_data:"Data Sources",footer_charity:"Public Welfare",
    footer_explorers:"Explorers",footer_faq:"FAQ",explorer_title:"Top 10 Solana Blockchain Explorers",explorer_desc:"Global leading Solana blockchain explorers and data query platforms. Updated monthly with the latest features and stats.",explorer_monthly:"Monthly update",
    footer_copy:"EACOswap - Solana DEX Navigation Hub | eaco for earth | ",footer_auto:"Auto-updated weekly/monthly",
    stat_sol_price:"SOL Price",stat_sol_tvl:"Solana TVL",stat_dex_vol:"24h DEX Vol",stat_spl_tokens:"SPL Tokens",stat_eaco_holders:"EACO Holders",api_config_title:"API Key Configuration (Optional)",api_config_desc:"eacoswap works without any API key by default (CoinGecko free API). For enhanced performance, configure your own Helius API key below.",api_config_save:"Save",api_config_clear:"Clear",api_config_note:"Note: Get a free Helius API key at",api_config_note2:". Free tier includes 1M credits/month. Key stored in browser localStorage only.",
  },
  zh: {
    hero_title:"EACOswap",hero_sub:"Solana DEX导航中心 - EACO兑换SOL、USDT、USDC、wBNB、TRX、wETH、wBTC、eCNH，全部链上完成",
    search_ph:"搜索DEX或代币...",search_btn:"搜索",auto_update:"每周/每月自动更新",
    connect_wallet:"连接钱包",disconnect_wallet:"断开连接",wallet_title:"连接Solana钱包",close:"关闭",
    swap_quote_title:"EACO兑换报价计算器",swap_input_label:"您支付 (EACO)",swap_output_label:"您收到",
    get_quote:"获取报价",quote_output:"输出数量:",quote_slippage:"滑点:",quote_route:"路由:",quote_price_impact:"价格影响:",
    quote_loading:"正在获取报价...",quote_error_prefix:"报价错误: ",
    use_server_proxy:"使用服务器代理（推荐）",use_server_proxy_hint:"所有Helius RPC调用通过后端的 /api/helius/* 路由",
    dex_title:"Solana链前10大DEX",dex_desc:"支持Solana链及EACO代币交易的全球领先去中心化交易所",
    exchange_title:"EACO兑换中心",exchange_desc:"EACO可兑换以下代币，全部在Solana链内完成。点击任意代币查看OrbMarkets详情。",
    tab_all:"全部交易对",tab_stable:"稳定币",tab_wrapped:"包装资产",tab_native:"原生代币",
    exchange_methods:"EACO兑换方式",
    method_1:"方式一：Jupiter聚合器",method_1_d:"访问 jup.ag，选择EACO作为输入代币，选择输出代币，Jupiter自动路由最优价格池。",
    method_2:"方式二：Raydium AMM",method_2_d:"访问 raydium.io，使用Swap功能，EACO交易对可在CLMM和AMM池中找到。",
    method_3:"方式三：Orca Whirlpool",method_3_d:"访问 orca.so，集中流动性池为EACO交易对提供更窄价差。",
    method_4:"方式四：Meteora DLMM",method_4_d:"访问 meteora.ag，动态流动性做市商为EACO兑换提供最优费率。",
    method_5:"方式五：Phoenix订单簿",method_5_d:"访问 phoenix.finance，链上订单簿DEX支持EACO限价单。",
    method_6:"方式六：直接OrbMarkets",method_6_d:"使用orbmarkets.io代币页面获取实时定价和直接兑换链接。",
    mcap_title:"SOL链代币市值排名",mcap_desc:"按市值排名的SPL代币。数据通过OrbMarkets开发者工具每周/每月自动更新。",
    mcap_top100:"前100",mcap_top1000:"前1000",mcap_top10000:"前10000",
    period_label:"时间维度:",period_weekly:"每周",period_monthly:"每月",period_daily:"每日",
    last_update:"最后更新:",next_update:"下次刷新:",
    api_error:"API暂时不可用，请查看:",mcap_more:"显示部分数据，查看完整列表:",
    th_token:"代币",th_symbol:"符号",th_price:"价格",th_mcap:"市值",th_vol:"24h交易量",th_chg:"涨跌",th_link:"链接",
    loading:"正在加载代币数据...",
    eaco_title:"EACO - 地球链代币",eaco_desc:"EACO（地球币）是部署在Solana链上的代币，致力于充分利用地球村的剩余劳动力实现价值交换，量化地球资源，保护地球。",
    eaco_basic:"基本信息",eaco_chain:"链:",eaco_contract:"合约:",eaco_symbol:"符号:",eaco_type:"类型:",eaco_vision:"愿景:",eaco_vision_v:"eaco for earth",
    eaco_mission:"使命:",eaco_mission_v:"充分利用地球村的剩余劳动力实现价值交换",
    eaco_resources:"资源与链接",eaco_resources_d:"在以下平台探索EACO:",
    dev_title:"开发者工具与自动更新",dev_desc:"集成OrbMarkets API和Solana数据源，支持每周/每月自动更新代币信息。",
    dev_orb_d:"从OrbMarkets获取实时代币数据、价格和市值。",
    dev_rpc_d:"查询链上代币账户、余额和元数据。",
    dev_jup_d:"获取所有Solana DEX池中的最优兑换价格。",
    dev_bird_d:"全面的代币市场数据和分析。",
    dev_cron:"每周/每月定时任务",dev_cron_d:"定时获取按市值排名的前100/1000/10000个SPL代币，本地存储用于对比。",
    dev_dexs:"DEX聚合器",dev_dexs_d:"Jupiter将EACO兑换路由至Raydium、Orca、Meteora、Phoenix等。",
    charity_title:"EACO公益2025",charity_desc:"保护地球是全球共同的情绪价值。加入EACO公益倡议。",
    charity_link:"进入EACO公益2025",
    theme_cosmic:"宇宙蓝",theme_army:"军绿",theme_classic:"米黄古典",
    footer_dex:"顶级DEX",footer_exchange:"EACO兑换",footer_mcap:"市值排名",footer_eaco:"EACO信息",footer_dev:"开发者工具",
    footer_tokens:"代币",footer_dex_list:"DEX列表",footer_data:"数据源",footer_charity:"公益",
    footer_explorers:"浏览器",footer_faq:"常见问题",explorer_title:"Solana链前10大区块链浏览器",explorer_desc:"全球领先的Solana区块链浏览器和数据查询平台。每月更新最新功能和数据。",explorer_monthly:"每月更新",
    footer_copy:"EACOswap - Solana DEX导航中心 | eaco for earth | ",footer_auto:"每周/每月自动更新",
    stat_sol_price:"SOL价格",stat_sol_tvl:"Solana TVL",stat_dex_vol:"24h DEX交易量",stat_spl_tokens:"SPL代币",stat_eaco_holders:"EACO持有者",api_config_title:"API密钥配置（可选）",api_config_desc:"eacoswap默认无需任何API密钥即可工作（CoinGecko免费API）。如需增强功能，请在下方配置您的Helius API密钥。",api_config_save:"保存",api_config_clear:"清除",api_config_note:"说明：在",api_config_note2:"获取免费Helius API密钥。免费套餐每月包含100万次调用。密钥仅保存在浏览器本地存储中。",
  },
  es: {
    hero_title:"EACOswap",hero_sub:"Hub de Navegacion DEX de Solana - Intercambia EACO por SOL, USDT, USDC, wBNB, TRX, wETH, wBTC, eCNH en cadena",
    search_ph:"Buscar DEX o token...",search_btn:"Buscar",auto_update:"Actualizacion semanal/mensual automatica",
    connect_wallet:"Conectar Billetera",disconnect_wallet:"Desconectar",wallet_title:"Conectar Billetera Solana",close:"Cerrar",
    swap_quote_title:"Calculadora de Cotizacion EACO",swap_input_label:"Pagas (EACO)",swap_output_label:"Recibes",
    get_quote:"Obtener Cotizacion",quote_output:"Salida:",quote_slippage:"Deslizamiento:",quote_route:"Ruta:",quote_price_impact:"Impacto de Precio:",
    quote_loading:"Cargando cotizacion...",quote_error_prefix:"Error de cotizacion: ",
    use_server_proxy:"Usar Proxy del Servidor (recomendado)",use_server_proxy_hint:"Enruta todas las llamadas Helius RPC a traves del backend /api/helius/*",
    dex_title:"Top 10 DEX de Solana",dex_desc:"Plataformas DEX lideres mundiales que soportan la cadena Solana y el token EACO",
    exchange_title:"Centro de Intercambio EACO",exchange_desc:"EACO se puede intercambiar por los siguientes tokens, todo en la cadena Solana. Haz clic en cualquier token para ver en OrbMarkets.",
    tab_all:"Todos los pares",tab_stable:"Stablecoins",tab_wrapped:"Assets envueltos",tab_native:"Nativo",
    exchange_methods:"Como intercambiar EACO",
    method_1:"Metodo 1: Jupiter Aggregator",method_1_d:"Visita jup.ag, selecciona EACO como token de entrada, elige token de salida, Jupiter enruta por los mejores pools.",
    method_2:"Metodo 2: Raydium AMM",method_2_d:"Visita raydium.io, usa la funcion Swap, pares de EACO disponibles en pools CLMM y AMM.",
    method_3:"Metodo 3: Orca Whirlpool",method_3_d:"Visita orca.so, pools de liquidez concentrada para spreads mas ajustados en pares EACO.",
    method_4:"Metodo 4: Meteora DLMM",method_4_d:"Visita meteora.ag, creador de mercado de liquidez dinamica para tasas optimas de EACO.",
    method_5:"Metodo 5: Phoenix Orderbook",method_5_d:"Visita phoenix.finance, DEX de orderbook en cadena para ordenes limitadas de EACO.",
    method_6:"Metodo 6: OrbMarkets directo",method_6_d:"Usa las paginas de tokens en orbmarkets.io para precios en tiempo real y enlaces directos.",
    mcap_title:"Rankings de Market Cap de Tokens SOL",mcap_desc:"Top tokens SPL por capitalizacion de mercado. Datos actualizados semanal/mensualmente via OrbMarkets.",
    mcap_top100:"Top 100",mcap_top1000:"Top 1000",mcap_top10000:"Top 10000",
    period_label:"Periodo:",period_weekly:"Semanal",period_monthly:"Mensual",period_daily:"Diario",
    last_update:"Ultima actualizacion:",next_update:"Proxima actualizacion:",
    api_error:"API temporalmente no disponible. Verifica en:",mcap_more:"Mostrando datos parciales. Ver lista completa:",
    th_token:"Token",th_symbol:"Simbolo",th_price:"Precio",th_mcap:"Market Cap",th_vol:"Volumen 24h",th_chg:"Cambio",th_link:"Enlaces",
    loading:"Cargando datos de tokens...",
    eaco_title:"EACO - Token de Earth Chain",eaco_desc:"EACO (Earth Coin) es un token de la cadena Solana dedicado a aprovechar el excedente laboral global para el intercambio de valor.",
    eaco_basic:"Informacion basica",eaco_chain:"Cadena:",eaco_contract:"Contrato:",eaco_symbol:"Simbolo:",eaco_type:"Tipo:",eaco_vision:"Vision:",eaco_vision_v:"eaco for earth",
    eaco_mission:"Mision:",eaco_mission_v:"Aprovechar el excedente laboral global para el intercambio de valor",
    eaco_resources:"Recursos y enlaces",eaco_resources_d:"Explora EACO en estas plataformas:",
    dev_title:"Herramientas de desarrollo y auto-actualizacion",dev_desc:"Integrado con OrbMarkets API y fuentes de datos de Solana para actualizaciones automaticas.",
    dev_orb_d:"Obten datos de tokens en tiempo real, precios y market cap de OrbMarkets.",
    dev_rpc_d:"Consulta cuentas de tokens on-chain, saldos y metadatos.",
    dev_jup_d:"Obten los mejores precios de swap en todos los pools DEX de Solana.",
    dev_bird_d:"Datos completos de mercado de tokens y analiticas.",
    dev_cron:"Cron semanal/mensual",dev_cron_d:"Obtencion programada de top 100/1000/10000 tokens SPL por market cap.",
    dev_dexs:"Agregador DEX",dev_dexs_d:"Jupiter enruta swaps de EACO a traves de Raydium, Orca, Meteora, Phoenix y mas.",
    charity_title:"EACO Obra Publica 2025",charity_desc:"Proteger la Tierra es un valor emocional compartido. Unete a la iniciativa de obra publica EACO.",
    charity_link:"Entrar a EACO Obra Publica 2025",
    theme_cosmic:"Cosmico",theme_army:"Militar",theme_classic:"Clasico",
    footer_dex:"Top DEXs",footer_exchange:"Intercambio EACO",footer_mcap:"Rankings",footer_eaco:"Info EACO",footer_dev:"Herramientas Dev",
    footer_tokens:"Tokens",footer_dex_list:"Lista DEX",footer_data:"Fuentes de datos",footer_charity:"Obra Publica",
    footer_explorers:"Exploradores",footer_faq:"Preguntas Frecuentes",explorer_title:"Top 10 Exploradores de Blockchain Solana",explorer_desc:"Exploradores de blockchain Solana lideres mundiales y plataformas de consulta de datos. Actualizados mensualmente.",explorer_monthly:"Actualizacion mensual",
    footer_copy:"EACOswap - Hub de Navegacion DEX de Solana | eaco for earth | ",footer_auto:"Actualizacion semanal/mensual automatica",
    stat_sol_price:"Precio SOL",stat_sol_tvl:"TVL Solana",stat_dex_vol:"Vol DEX 24h",stat_spl_tokens:"Tokens SPL",stat_eaco_holders:"Titulares EACO",api_config_title:"Configuracion de API (Opcional)",api_config_desc:"eacoswap funciona sin ninguna clave API por defecto (API gratuita de CoinGecko). Para un rendimiento mejorado, configure su propia clave API de Helius a continuacion.",api_config_save:"Guardar",api_config_clear:"Borrar",api_config_note:"Nota: Obtenga una clave API gratuita de Helius en",api_config_note2:". El nivel gratuito incluye 1M creditos/mes. La clave se almacena solo en el almacenamiento local del navegador.",
  },
  ar: {
    hero_title:"EACOswap",hero_sub:"مركز تنقل DEX لسولانا - تبادل EACO مقابل SOL وUSDT وUSDC وwBNB وTRX وwETH وwBTC وeCNH على السلسلة",
    search_ph:"ابحث عن DEX أو رمز...",search_btn:"بحث",auto_update:"تحديث تلقائي أسبوعي/شهري",
    connect_wallet:"ربط المحفظة",disconnect_wallet:"فصل",wallet_title:"ربط محفظة سولانا",close:"إغلاق",
    swap_quote_title:"حاسبة عرض EACO",swap_input_label:"تدفع (EACO)",swap_output_label:"تحصل على",
    get_quote:"احصل على العرض",quote_output:"الناتج:",quote_slippage:"الانزلاق:",quote_route:"المسار:",quote_price_impact:"تأثير السعر:",
    quote_loading:"جاري تحميل العرض...",quote_error_prefix:"خطأ في العرض: ",
    use_server_proxy:"استخدام وكيل الخادم (موصى به)",use_server_proxy_hint:"توجيه جميع مكالمات Helius RPC عبر الواجهة الخلفية /api/helius/*",
    dex_title:"أفضل 10 منصات DEX على سولانا",dex_desc:"منصات DEX العالمية الرائدة التي تدعم سلسلة سولانا ورمز EACO",
    exchange_title:"مركز تبادل EACO",exchange_desc:"يمكن تبادل EACO مقابل الرموز التالية، جميعها على سلسلة سولانا. انقر على أي رمز لعرضه على OrbMarkets.",
    tab_all:"كل الأزواج",tab_stable:"عملات مستقرة",tab_wrapped:"أصول مغلفة",tab_native:"أصلي",
    exchange_methods:"كيفية تبادل EACO",
    method_1:"الطريقة 1: مجمّع Jupiter",method_1_d:"زر jup.ag، اختر EACO كرمز إدخال، اختر رمز الإخراج، يقوم Jupiter بالتوجيه عبر أفضل المجمعات.",
    method_2:"الطريقة 2: Raydium AMM",method_2_d:"زر raydium.io، استخدم ميزة Swap، أزواج EACO متاحة في مجمعات CLMM وAMM.",
    method_3:"الطريقة 3: Orca Whirlpool",method_3_d:"زر orca.so، مجمعات سيولة مركزة لفروقات أضيق على أزواج EACO.",
    method_4:"الطريقة 4: Meteora DLMM",method_4_d:"زر meteora.ag، صانع سوق سيولة ديناميكي لأفضل أسعار تبادل EACO.",
    method_5:"الطريقة 5: Phoenix Orderbook",method_5_d:"زر phoenix.finance، DEX دفتر أوامر على السلسلة لأوامر محدودة لـ EACO.",
    method_6:"الطريقة 6: OrbMarkets مباشرة",method_6_d:"استخدم صفحات الرموز على orbmarkets.io للحصول على تسعير في الوقت الفعلي وروابط مباشرة.",
    mcap_title:"ترتيب القيمة السوقية لرموز سولانا",mcap_desc:"أفضل رموز SPL حسب القيمة السوقية. يتم تحديث البيانات أسبوعياً/شهرياً عبر OrbMarkets.",
    mcap_top100:"أفضل 100",mcap_top1000:"أفضل 1000",mcap_top10000:"أفضل 10000",
    period_label:"الإطار الزمني:",period_weekly:"أسبوعي",period_monthly:"شهري",period_daily:"يومي",
    last_update:"آخر تحديث:",next_update:"التحديث القادم:",
    api_error:"API غير متاح مؤقتاً. تحقق من:",mcap_more:"عرض بيانات جزئية. القائمة الكاملة:",
    th_token:"الرمز",th_symbol:"الرمز",th_price:"السعر",th_mcap:"القيمة السوقية",th_vol:"حجم 24س",th_chg:"التغير",th_link:"روابط",
    loading:"جاري تحميل بيانات الرموز...",
    eaco_title:"EACO - رمز سلسلة الأرض",eaco_desc:"EACO (عملة الأرض) هو رمز على سلسلة سولانا مخصص لاستغلال فائض العمالة العالمية لتبادل القيمة.",
    eaco_basic:"معلومات أساسية",eaco_chain:"السلسلة:",eaco_contract:"العقد:",eaco_symbol:"الرمز:",eaco_type:"النوع:",eaco_vision:"الرؤية:",eaco_vision_v:"eaco for earth",
    eaco_mission:"المهمة:",eaco_mission_v:"استغلال فائض العمالة العالمية لتبادل القيمة",
    eaco_resources:"المصادر والروابط",eaco_resources_d:"استكشف EACO على هذه المنصات:",
    dev_title:"أدوات المطور والتحديث التلقائي",dev_desc:"متكامل مع OrbMarkets API ومصادر بيانات سولانا للتحديثات التلقائية.",
    dev_orb_d:"احصل على بيانات الرموز في الوقت الفعلي والأسعار والقيمة السوقية من OrbMarkets.",
    dev_rpc_d:"استفسر عن حسابات الرموز على السلسلة والأرصدة والبيانات الوصفية.",
    dev_jup_d:"احصل على أفضل أسعار التبادل عبر جميع مجمعات DEX على سولانا.",
    dev_bird_d:"بيانات شاملة لسوق الرموز والتحليلات.",
    dev_cron:"مجدول أسبوعي/شهري",dev_cron_d:"جلب مجدول لأفضل 100/1000/10000 رمز SPL حسب القيمة السوقية.",
    dev_dexs:"مجمّع DEX",dev_dexs_d:"يقوم Jupiter بتوجيه تبادلات EACO عبر Raydium وOrca وMeteora وPhoenix والمزيد.",
    charity_title:"EACO العامة 2025",charity_desc:"حماية الأرض هي قيمة عاطفية مشتركة. انضم إلى مبادرة EACO العامة.",
    charity_link:"دخول EACO العامة 2025",
    theme_cosmic:"كوني",theme_army:"عسكري",theme_classic:"كلاسيكي",
    footer_dex:"أفضل DEXs",footer_exchange:"تبادل EACO",footer_mcap:"الترتيب",footer_eaco:"معلومات EACO",footer_dev:"أدوات المطور",
    footer_tokens:"الرموز",footer_dex_list:"قائمة DEX",footer_data:"مصادر البيانات",footer_charity:"العامة",
    footer_explorers:"المستكشفون",footer_faq:"الأسئلة الشائعة",explorer_title:"أفضل 10 مستكشفي بلوكشين سولانا",explorer_desc:"منصات استكشاف بلوكشين سولانا الرائدة عالمياً. تحديث شهري.",explorer_monthly:"تحديث شهري",
    footer_copy:"EACOswap - مركز تنقل DEX لسولانا | eaco for earth | ",footer_auto:"تحديث تلقائي أسبوعي/شهري",
    stat_sol_price:"سعر SOL",stat_sol_tvl:"TVL سولانا",stat_dex_vol:"حجم DEX 24س",stat_spl_tokens:"رموز SPL",stat_eaco_holders:"حاملون EACO",api_config_title:"تكوين مفتاح API (اختياري)",api_config_desc:"يعمل eacoswap دون أي مفتاح API بشكل افتراضي (API المجاني من CoinGecko). لتحسين الأداء، قم بتكوين مفتاح Helius API الخاص بك أدناه.",api_config_save:"حفظ",api_config_clear:"مسح",api_config_note:"ملاحظة: احصل على مفتاح Helius API مجاني في",api_config_note2:". يتضمن المستوى المجاني 1M رصيد/شهر. يتم تخزين المفتاح في localStorage للمتصفح فقط.",
  },
  fr: {
    hero_title:"EACOswap",hero_sub:"Hub de Navigation DEX Solana - Echangez EACO contre SOL, USDT, USDC, wBNB, TRX, wETH, wBTC, eCNH on-chain",
    search_ph:"Rechercher DEX ou token...",search_btn:"Rechercher",auto_update:"Mise a jour hebdomadaire/mensuelle auto",
    connect_wallet:"Connecter Portefeuille",disconnect_wallet:"Deconnecter",wallet_title:"Connecter Portefeuille Solana",close:"Fermer",
    swap_quote_title:"Calculateur de Cotation EACO",swap_input_label:"Vous payez (EACO)",swap_output_label:"Vous recevez",
    get_quote:"Obtenir Cotation",quote_output:"Sortie:",quote_slippage:"Glissement:",quote_route:"Route:",quote_price_impact:"Impact Prix:",
    quote_loading:"Chargement de la cotation...",quote_error_prefix:"Erreur de cotation: ",
    use_server_proxy:"Utiliser Proxy Serveur (recommande)",use_server_proxy_hint:"Route tous les appels Helius RPC via le backend /api/helius/*",
    dex_title:"Top 10 DEX Solana",dex_desc:"Plateformes DEX mondiales de premier plan supportant la chaine Solana et le token EACO",
    exchange_title:"Centre d'Echange EACO",exchange_desc:"EACO peut etre echange contre les tokens suivants, tous sur la chaine Solana. Cliquez sur un token pour voir sur OrbMarkets.",
    tab_all:"Toutes les paires",tab_stable:"Stablecoins",tab_wrapped:"Assets encapsules",tab_native:"Natif",
    exchange_methods:"Comment echanger EACO",
    method_1:"Methode 1: Jupiter Aggregator",method_1_d:"Visitez jup.ag, selectionnez EACO comme token d'entree, choisissez token de sortie, Jupiter route par les meilleurs pools.",
    method_2:"Methode 2: Raydium AMM",method_2_d:"Visitez raydium.io, utilisez la fonction Swap, paires EACO disponibles en pools CLMM et AMM.",
    method_3:"Methode 3: Orca Whirlpool",method_3_d:"Visitez orca.so, pools de liquidite concentree pour spreads plus serres sur paires EACO.",
    method_4:"Methode 4: Meteora DLMM",method_4_d:"Visitez meteora.ag, market maker de liquidite dynamique pour taux d'echange EACO optimaux.",
    method_5:"Methode 5: Phoenix Orderbook",method_5_d:"Visitez phoenix.finance, DEX carnet d'ordres on-chain pour ordres limites sur EACO.",
    method_6:"Methode 6: OrbMarkets direct",method_6_d:"Utilisez les pages de tokens sur orbmarkets.io pour prix en temps reel et liens directs.",
    mcap_title:"Classement Market Cap Tokens SOL",mcap_desc:"Top tokens SPL par capitalisation boursiere. Donnees mises a jour hebdomadairement/mensuellement via OrbMarkets.",
    mcap_top100:"Top 100",mcap_top1000:"Top 1000",mcap_top10000:"Top 10000",
    period_label:"Periode:",period_weekly:"Hebdomadaire",period_monthly:"Mensuel",period_daily:"Quotidien",
    last_update:"Derniere maj:",next_update:"Prochain refresh:",
    api_error:"API temporairement indisponible. Verifiez sur:",mcap_more:"Donnees partielles. Liste complete:",
    th_token:"Token",th_symbol:"Symbole",th_price:"Prix",th_mcap:"Market Cap",th_vol:"Volume 24h",th_chg:"Variation",th_link:"Liens",
    loading:"Chargement des donnees de tokens...",
    eaco_title:"EACO - Token Earth Chain",eaco_desc:"EACO (Earth Coin) est un token sur la chaine Solana dedie a valoriser le surplus de travail mondial pour l'echange de valeur.",
    eaco_basic:"Informations de base",eaco_chain:"Chaine:",eaco_contract:"Contrat:",eaco_symbol:"Symbole:",eaco_type:"Type:",eaco_vision:"Vision:",eaco_vision_v:"eaco for earth",
    eaco_mission:"Mission:",eaco_mission_v:"Valoriser le surplus de travail mondial pour l'echange de valeur",
    eaco_resources:"Ressources et liens",eaco_resources_d:"Explorez EACO sur ces plateformes:",
    dev_title:"Outils developpeur et mise a jour auto",dev_desc:"Integre avec OrbMarkets API et sources de donnees Solana pour mises a jour automatiques.",
    dev_orb_d:"Recuperez donnees de tokens en temps reel, prix et market cap depuis OrbMarkets.",
    dev_rpc_d:"Requetez comptes de tokens on-chain, soldes et metadonnees.",
    dev_jup_d:"Obtenez les meilleurs prix de swap sur tous les pools DEX Solana.",
    dev_bird_d:"Donnees completes de marche de tokens et analytiques.",
    dev_cron:"Cron hebdo/mensuel",dev_cron_d:"Recuperation programmee du top 100/1000/10000 tokens SPL par market cap.",
    dev_dexs:"Aggregateur DEX",dev_dexs_d:"Jupiter route les swaps EACO via Raydium, Orca, Meteora, Phoenix et plus.",
    charity_title:"EACO Solidarite 2025",charity_desc:"Proteger la Terre est une valeur emotionnelle partagee. Rejoignez l'initiative solidaire EACO.",
    charity_link:"Entrer EACO Solidarite 2025",
    theme_cosmic:"Cosmique",theme_army:"Armee",theme_classic:"Classique",
    footer_dex:"Top DEXs",footer_exchange:"Echange EACO",footer_mcap:"Classement",footer_eaco:"Info EACO",footer_dev:"Outils Dev",
    footer_tokens:"Tokens",footer_dex_list:"Liste DEX",footer_data:"Sources de donnees",footer_charity:"Solidarite",
    footer_explorers:"Explorateurs",footer_faq:"FAQ",explorer_title:"Top 10 Explorateurs Blockchain Solana",explorer_desc:"Explorateurs blockchain Solana leaders mondiaux. Mise a jour mensuelle.",explorer_monthly:"Mise a jour mensuelle",
    footer_copy:"EACOswap - Hub de Navigation DEX Solana | eaco for earth | ",footer_auto:"Mise a jour hebdo/mensuelle auto",
    stat_sol_price:"Prix SOL",stat_sol_tvl:"TVL Solana",stat_dex_vol:"Vol DEX 24h",stat_spl_tokens:"Tokens SPL",stat_eaco_holders:"Detenteurs EACO",api_config_title:"Configuration de la cle API (Facultatif)",api_config_desc:"eacoswap fonctionne sans aucune cle API par defaut (API gratuite CoinGecko). Pour des performances ameliorees, configurez votre propre cle API Helius ci-dessous.",api_config_save:"Enregistrer",api_config_clear:"Effacer",api_config_note:"Remarque : Obtenez une cle API Helius gratuite sur",api_config_note2:". Le niveau gratuit inclut 1M credits/mois. La cle est stockee uniquement dans le localStorage du navigateur.",
  },
  ru: {
    hero_title:"EACOswap",hero_sub:"Hub навигации DEX Solana - Обменивайте EACO на SOL, USDT, USDC, wBNB, TRX, wETH, wBTC, eCNH в сети",
    search_ph:"Поиск DEX или токена...",search_btn:"Поиск",auto_update:"Автообновление еженедельно/ежемесячно",
    connect_wallet:"Подключить Кошелек",disconnect_wallet:"Отключить",wallet_title:"Подключить Кошелек Solana",close:"Закрыть",
    swap_quote_title:"Калькулятор Котировок EACO",swap_input_label:"Вы платите (EACO)",swap_output_label:"Вы получаете",
    get_quote:"Получить Котировку",quote_output:"Выход:",quote_slippage:"Проскальзывание:",quote_route:"Маршрут:",quote_price_impact:"Влияние на Цену:",
    quote_loading:"Загрузка котировки...",quote_error_prefix:"Ошибка котировки: ",
    use_server_proxy:"Использовать Прокси Сервер (рекомендуется)",use_server_proxy_hint:"Маршрутизирует все вызовы Helius RPC через бэкенд /api/helius/*",
    dex_title:"Топ-10 DEX Solana",dex_desc:"Ведущие мировые DEX-платформы, поддерживающие цепочку Solana и токен EACO",
    exchange_title:"Центр обмена EACO",exchange_desc:"EACO можно обменять на следующие токены, все в цепочке Solana. Нажмите на токен для просмотра на OrbMarkets.",
    tab_all:"Все пары",tab_stable:"Стейблкоины",tab_wrapped:"Обернутые активы",tab_native:"Нативный",
    exchange_methods:"Как обменять EACO",
    method_1:"Способ 1: Jupiter Aggregator",method_1_d:"Посетите jup.ag, выберите EACO как входной токен, выберите выходной, Jupiter маршрутизирует через лучшие пулы.",
    method_2:"Способ 2: Raydium AMM",method_2_d:"Посетите raydium.io, используйте функцию Swap, пары EACO доступны в пулах CLMM и AMM.",
    method_3:"Способ 3: Orca Whirlpool",method_3_d:"Посетите orca.so, пулы концентрированной ликвидности для более узких спредов по парам EACO.",
    method_4:"Способ 4: Meteora DLMM",method_4_d:"Посетите meteora.ag, динамический маркет-мейкер ликвидности для оптимальных ставок обмена EACO.",
    method_5:"Способ 5: Phoenix Orderbook",method_5_d:"Посетите phoenix.finance, on-chain ордербук DEX для лимитных ордеров по EACO.",
    method_6:"Способ 6: OrbMarkets напрямую",method_6_d:"Используйте страницы токенов на orbmarkets.io для цен в реальном времени и прямых ссылок.",
    mcap_title:"Рейтинг капитализации токенов SOL",mcap_desc:"Топ токенов SPL по рыночной капитализации. Данные обновляются еженедельно/ежемесячно через OrbMarkets.",
    mcap_top100:"Топ 100",mcap_top1000:"Топ 1000",mcap_top10000:"Топ 10000",
    period_label:"Период:",period_weekly:"Еженедельно",period_monthly:"Ежемесячно",period_daily:"Ежедневно",
    last_update:"Последнее обновление:",next_update:"Следующее обновление:",
    api_error:"API временно недоступен. Проверьте на:",mcap_more:"Показаны частичные данные. Полный список:",
    th_token:"Токен",th_symbol:"Символ",th_price:"Цена",th_mcap:"Капитализация",th_vol:"Объем 24ч",th_chg:"Изменение",th_link:"Ссылки",
    loading:"Загрузка данных токенов...",
    eaco_title:"EACO - Токен Earth Chain",eaco_desc:"EACO (Earth Coin) - токен в цепочке Solana, посвященный использованию избыточной рабочей силы для обмена ценностями.",
    eaco_basic:"Базовая информация",eaco_chain:"Сеть:",eaco_contract:"Контракт:",eaco_symbol:"Символ:",eaco_type:"Тип:",eaco_vision:"Видение:",eaco_vision_v:"eaco for earth",
    eaco_mission:"Миссия:",eaco_mission_v:"Использовать избыточную рабочую силу для обмена ценностями",
    eaco_resources:"Ресурсы и ссылки",eaco_resources_d:"Изучите EACO на этих платформах:",
    dev_title:"Инструменты разработчика и автообновление",dev_desc:"Интегрировано с OrbMarkets API и источниками данных Solana для автоматических обновлений.",
    dev_orb_d:"Получайте данные токенов в реальном времени, цены и капитализацию с OrbMarkets.",
    dev_rpc_d:"Запрашивайте on-chain аккаунты токенов, балансы и метаданные.",
    dev_jup_d:"Получайте лучшие цены свопа по всем пулам DEX Solana.",
    dev_bird_d:"Полные данные рынка токенов и аналитика.",
    dev_cron:"Еженедельный/ежемесячный Cron",dev_cron_d:"Запланированное получение топ 100/1000/10000 SPL токенов по капитализации.",
    dev_dexs:"Агрегатор DEX",dev_dexs_d:"Jupiter маршрутизирует свопы EACO через Raydium, Orca, Meteora, Phoenix и др.",
    charity_title:"EACO Общественная деятельность 2025",charity_desc:"Защита Земли - общая эмоциональная ценность. Присоединяйтесь к общественной инициативе EACO.",
    charity_link:"Войти в EACO Общественную деятельность 2025",
    theme_cosmic:"Космический",theme_army:"Военный",theme_classic:"Классический",
    footer_dex:"Топ DEXs",footer_exchange:"Обмен EACO",footer_mcap:"Рейтинг",footer_eaco:"Инфо EACO",footer_dev:"Инструменты Dev",
    footer_tokens:"Токены",footer_dex_list:"Список DEX",footer_data:"Источники данных",footer_charity:"Общественная деятельность",
    footer_explorers:"Эксплореры",footer_faq:"ЧаВо",explorer_title:"Топ-10 эксплореров блокчейна Solana",explorer_desc:"Ведущие эксплореры блокчейна Solana. Ежемесячное обновление.",explorer_monthly:"Ежемесячное обновление",
    footer_copy:"EACOswap - Hub навигации DEX Solana | eaco for earth | ",footer_auto:"Автообновление еженедельно/ежемесячно",
    stat_sol_price:"Цена SOL",stat_sol_tvl:"TVL Solana",stat_dex_vol:"Объем DEX 24ч",stat_spl_tokens:"Токены SPL",stat_eaco_holders:"Держатели EACO",api_config_title:"Настройка ключа API (Опционально)",api_config_desc:"eacoswap работает без ключа API по умолчанию (бесплатный API CoinGecko). Для повышения производительности настройте свой ключ Helius API ниже.",api_config_save:"Сохранить",api_config_clear:"Очистить",api_config_note:"Примечание: Получите бесплатный ключ Helius API на",api_config_note2:". Бесплатный тариф включает 1M кредитов/мес. Ключ хранится только в localStorage браузера.",
  }
};

// ===== DEX Data =====
const DEX_LIST = [
  {rank:1,name:"Jupiter",type:"Aggregator",url:"https://jup.ag",desc:"Solana's #1 DEX aggregator, routes across all major pools for best prices",tvl:"$16.9B",vol:"$8.79B"},
  {rank:2,name:"Raydium",type:"AMM + CLMM",url:"https://raydium.io",desc:"Leading AMM with concentrated liquidity, deep pools for EACO pairs",tvl:"$9.9B",vol:"$3.2B"},
  {rank:3,name:"Orca",type:"CLMM",url:"https://www.orca.so",desc:"User-friendly concentrated liquidity DEX, 402+ trading pairs",tvl:"$5-8B",vol:"$348M"},
  {rank:4,name:"Meteora",type:"DLMM",url:"https://www.meteora.ag",desc:"Dynamic Liquidity Market Maker, innovative token launching platform",tvl:"$2.1B",vol:"$1.5B"},
  {rank:5,name:"Phoenix",type:"Orderbook",url:"https://phoenix.finance",desc:"On-chain central-limit order book DEX, high throughput matching",tvl:"$1.8B",vol:"$980M"},
  {rank:6,name:"Lifinity",type:"Oracle AMM",url:"https://lifinity.io",desc:"Oracle-based AMM reducing impermanent loss, efficient pricing",tvl:"$1.2B",vol:"$420M"},
  {rank:7,name:"Drift Protocol",type:"Perp + Spot",url:"https://drift.trade",desc:"Perpetual futures and spot trading with deep liquidity",tvl:"$3.5B",vol:"$2.1B"},
  {rank:8,name:"Zeta Markets",type:"Derivatives",url:"https://zeta.markets",desc:"Orderbook-based derivatives DEX, options and perpetuals",tvl:"$800M",vol:"$650M"},
  {rank:9,name:"Crema",type:"Concentrated AMM",url:"https://crema.finance",desc:"Concentrated liquidity AMM with NFT LP positions",tvl:"$600M",vol:"$280M"},
  {rank:10,name:"Saros",type:"DeFi Suite",url:"https://saros.finance",desc:"Comprehensive DeFi platform with swap, liquidity mining, and more",tvl:"$400M",vol:"$150M"}
];

// ===== Token Data =====
const TOKEN_LIST = [
  {symbol:"SOL",name:"Solana",cls:"tc-sol",cat:"native",orb:"https://orbmarkets.io/token/So11111111111111111111111111111111111111112",dex:"https://jup.ag/swap/EACO-SOL",scan:"https://solscan.io/token/So11111111111111111111111111111111111111112"},
  {symbol:"EACO",name:"Earth Coin",cls:"tc-eaco",cat:"native",orb:"https://orbmarkets.io/token/DqfoyZH96RnvZusSp3Cdncjpyp3C74ZmJzGhjmHnDHRH",dex:"https://jup.ag/swap/SOL-EACO",scan:"https://solscan.io/token/DqfoyZH96RnvZusSp3Cdncjpyp3C74ZmJzGhjmHnDHRH"},
  {symbol:"USDT",name:"Tether USD (Solana)",cls:"tc-usdt",cat:"stable",orb:"https://orbmarkets.io/token/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",dex:"https://jup.ag/swap/EACO-USDT",scan:"https://solscan.io/token/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"},
  {symbol:"USDC",name:"USD Coin (Solana)",cls:"tc-usdc",cat:"stable",orb:"https://orbmarkets.io/token/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",dex:"https://jup.ag/swap/EACO-USDC",scan:"https://solscan.io/token/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"},
  {symbol:"wBNB",name:"Wrapped BNB (Wormhole)",cls:"tc-wbnb",cat:"wrapped",orb:"https://orbmarkets.io/token/9gP2kCy3wA1ctvYWQk75guqXuHfrEomqydHLtcTCqiLa",dex:"https://jup.ag/swap/EACO-wBNB",scan:"https://solscan.io/token/9gP2kCy3wA1ctvYWQk75guqXuHfrEomqydHLtcTCqiLa"},
  {symbol:"TRX",name:"TRON (Wormhole)",cls:"tc-trx",cat:"wrapped",orb:"https://orbmarkets.io/token/GbbesPbaYh5uiAZSYNXTc7w9jty1rpg3P9L4JeN4LkKc",dex:"https://jup.ag/swap/EACO-TRX",scan:"https://solscan.io/token/GbbesPbaYh5uiAZSYNXTc7w9jty1rpg3P9L4JeN4LkKc"},
  {symbol:"wETH",name:"Wrapped Ethereum (Wormhole)",cls:"tc-weth",cat:"wrapped",orb:"https://orbmarkets.io/token/7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs",dex:"https://jup.ag/swap/EACO-WETH",scan:"https://solscan.io/token/7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs"},
  {symbol:"wBTC",name:"Wrapped BTC (Wormhole)",cls:"tc-wbtc",cat:"wrapped",orb:"https://orbmarkets.io/token/3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh",dex:"https://jup.ag/swap/EACO-wBTC",scan:"https://solscan.io/token/3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh"},
  {symbol:"eCNH",name:"eCNH Stablecoin",cls:"tc-ecnh",cat:"stable",orb:"https://orbmarkets.io/token/7GQnqthWKa5v2GqXYWhmgWZY5mCRrniwK3Xuinm9GKw5",dex:"https://jup.ag/swap/EACO-eCNH",scan:"https://solscan.io/token/7GQnqthWKa5v2GqXYWhmgWZY5mCRrniwK3Xuinm9GKw5"},
];

// ===== Explorer Data =====
const EXPLORER_LIST = [
  {rank:1,name:"Solscan",type:"Block Explorer",url:"https://solscan.io",desc:"Most popular Solana explorer with deep DeFi, NFT, staking visualization and token analysis",feat:"DeFi/NFT/Staking","tps":"1300-3300",users:"Daily active"},
  {rank:2,name:"Solana Explorer",type:"Official Explorer",url:"https://explorer.solana.com",desc:"Official Solana Foundation blockchain explorer with full node and validator data",feat:"Official/Validators/RPC","tps":"Real-time",users:"Developers"},
  {rank:3,name:"SolanaFM",type:"Block Explorer",url:"https://solana.fm",desc:"Comprehensive data explorer with graph analysis, token holders and account portfolio views",feat:"Graph/Holders/Portfolio","tps":"Real-time",users:"Traders"},
  {rank:4,name:"Solana Beach",type:"Visual Explorer",url:"https://solanabeach.io",desc:"Visual blockchain explorer showing network health, validators, epochs and block details",feat:"Visual/Validators/Epochs","tps":"Real-time",users:"All users"},
  {rank:5,name:"DexScreener",type:"DEX Explorer",url:"https://dexscreener.com/solana",desc:"Real-time DEX trading data, price charts, liquidity pools and new pair discovery for Solana",feat:"Charts/Liquidity/New pairs","tps":"Real-time",users:"Traders"},
  {rank:6,name:"GeckoTerminal",type:"DEX Terminal",url:"https://www.geckoterminal.com/solana",desc:"CoinGecko-powered multi-chain DEX terminal with 2M+ tokens, hot pools and watchlists",feat:"Multi-chain/Watchlists/Charts","tps":"Real-time",users:"Traders"},
  {rank:7,name:"Birdeye",type:"Analytics Platform",url:"https://birdeye.so",desc:"Comprehensive Solana token market data, analytics, trading charts and wallet tracking",feat:"Analytics/Charts/Wallet tracking","tps":"Real-time",users:"Analysts"},
  {rank:8,name:"Solana Tracker",type:"Trading Terminal",url:"https://www.solanatracker.io",desc:"Real-time data API, trading terminal with one-click swaps, rug detection and 70+ endpoints",feat:"API/Swaps/Rug check","tps":"Real-time",users:"Developers/Traders"},
  {rank:9,name:"OrbMarkets",type:"Token Explorer",url:"https://orbmarkets.io",desc:"Solana token explorer with real-time pricing, market cap data and developer API tools",feat:"Pricing/MCap/API","tps":"Real-time",users:"All users"},
  {rank:10,name:"DappRadar",type:"DApp Tracker",url:"https://dappradar.com/chain/solana",desc:"Decentralized application tracking platform with 1000+ Solana DApps ranked by users and volume",feat:"DApps/Rankings/Volume","tps":"Aggregated",users:"Researchers"}
];

// ===== Wallet State =====
let connectedWallet = null;
let connectedAddress = null;

// ===== Backend API helpers =====
const API_BASE = '';

function getHeliusRpcUrl() {
  const useProxy = isServerProxyEnabled();
  if (useProxy) return API_BASE + '/api/helius/rpc';
  const key = getHeliusKey();
  if (key) return 'https://mainnet.helius-rpc.com/?api-key=' + encodeURIComponent(key);
  return 'https://api.mainnet-beta.solana.com';
}

function isServerProxyEnabled() {
  try {
    const el = document.getElementById('useServerProxy');
    return el ? el.checked : true;
  } catch (e) { return true; }
}

// ===== Wallet Connection =====
function initWallet() {
  const btn = document.getElementById('connectWalletBtn');
  const panel = document.getElementById('walletPanel');
  const closeBtn = document.getElementById('closeWalletPanel');
  const disconnectBtn = document.getElementById('disconnectWalletBtn');

  if (!btn || !panel) return;

  btn.addEventListener('click', () => {
    if (connectedWallet) {
      // already connected, show panel to disconnect
      panel.style.display = 'flex';
      updateWalletUI();
    } else {
      panel.style.display = 'flex';
    }
  });

  closeBtn && closeBtn.addEventListener('click', () => { panel.style.display = 'none'; });

  disconnectBtn && disconnectBtn.addEventListener('click', () => {
    connectedWallet = null;
    connectedAddress = null;
    panel.style.display = 'none';
    updateWalletButton();
  });

  // Wallet options
  document.querySelectorAll('.wallet-option').forEach(opt => {
    opt.addEventListener('click', async () => {
      const walletType = opt.dataset.wallet;
      await connectWallet(walletType);
    });
  });

  // Close on backdrop click
  panel.addEventListener('click', (e) => {
    if (e.target === panel) panel.style.display = 'none';
  });
}

async function connectWallet(type) {
  const statusEl = document.getElementById('walletStatus');
  if (statusEl) statusEl.textContent = 'Connecting...';

  try {
    let provider = null;
    if (type === 'phantom' && window.phantom?.solana) {
      provider = window.phantom.solana;
    } else if (type === 'solflare' && window.solflare) {
      provider = window.solflare;
    } else if (type === 'backpack' && window.backpack?.solana) {
      provider = window.backpack.solana;
    } else if (window.solana) {
      // generic fallback
      provider = window.solana;
    }

    if (!provider) {
      if (statusEl) statusEl.textContent = 'Wallet not installed. Please install ' + type + ' extension.';
      return;
    }

    const resp = await provider.connect();
    connectedWallet = type;
    connectedAddress = resp.publicKey ? resp.publicKey.toString() : (resp.publicKey?.toBase58 ? resp.publicKey.toBase58() : String(resp.publicKey));

    if (statusEl) statusEl.textContent = 'Connected: ' + connectedAddress.slice(0, 6) + '...' + connectedAddress.slice(-4);
    updateWalletUI();
    updateWalletButton();
  } catch (err) {
    if (statusEl) statusEl.textContent = 'Connection failed: ' + (err.message || err);
  }
}

function updateWalletUI() {
  const statusEl = document.getElementById('walletStatus');
  const disconnectBtn = document.getElementById('disconnectWalletBtn');
  if (connectedAddress) {
    if (statusEl) statusEl.textContent = 'Connected: ' + connectedAddress.slice(0, 6) + '...' + connectedAddress.slice(-4);
    if (disconnectBtn) disconnectBtn.style.display = 'block';
  } else {
    if (statusEl) statusEl.textContent = '';
    if (disconnectBtn) disconnectBtn.style.display = 'none';
  }
}

function updateWalletButton() {
  const btn = document.getElementById('connectWalletBtn');
  if (!btn) return;
  if (connectedWallet) {
    btn.textContent = connectedAddress ? connectedAddress.slice(0, 4) + '...' + connectedAddress.slice(-4) : 'Connected';
    btn.classList.add('connected');
    const lang = document.documentElement.lang || 'en';
    const dict = I18N[lang] || I18N.en;
    btn.title = dict.disconnect_wallet || 'Disconnect';
  } else {
    const lang = document.documentElement.lang || 'en';
    const dict = I18N[lang] || I18N.en;
    btn.textContent = dict.connect_wallet || 'Connect Wallet';
    btn.classList.remove('connected');
    btn.title = '';
  }
}

// ===== Swap Quote Calculator =====
function initSwapQuote() {
  const btn = document.getElementById('getQuoteBtn');
  if (!btn) return;
  btn.addEventListener('click', async () => {
    await fetchSwapQuote();
  });
}

async function fetchSwapQuote() {
  const inputEl = document.getElementById('swapInputAmount');
  const outputSelect = document.getElementById('swapOutputToken');
  const resultDiv = document.getElementById('quoteResult');
  const errorDiv = document.getElementById('quoteError');
  const btn = document.getElementById('getQuoteBtn');

  const amount = parseFloat(inputEl.value);
  if (!amount || amount <= 0) {
    if (errorDiv) { errorDiv.textContent = 'Please enter a valid EACO amount'; errorDiv.style.display = 'block'; }
    if (resultDiv) resultDiv.style.display = 'none';
    return;
  }

  const outputMint = outputSelect.value;
  const eacoMint = 'DqfoyZH96RnvZusSp3Cdncjpyp3C74ZmJzGhjmHnDHRH';

  // EACO has 9 decimals (common for SPL tokens)
  const decimals = 9;
  const lamports = Math.floor(amount * Math.pow(10, decimals));

  if (btn) { btn.disabled = true; btn.textContent = 'Loading...'; }
  if (errorDiv) errorDiv.style.display = 'none';

  try {
    const url = API_BASE + '/api/jupiter/quote?inputMint=' + encodeURIComponent(eacoMint)
      + '&outputMint=' + encodeURIComponent(outputMint)
      + '&amount=' + lamports
      + '&slippageBps=50';

    const resp = await fetch(url);
    if (!resp.ok) throw new Error('Backend returned ' + resp.status);
    const data = await resp.json();
    const quoteData = data.data || data;

    if (quoteData && quoteData.outAmount) {
      const outDecimals = getTokenDecimals(outputMint);
      const outAmount = (parseInt(quoteData.outAmount, 10) / Math.pow(10, outDecimals)).toFixed(6);
      const slippage = (quoteData.slippageBps / 100).toFixed(2) + '%';
      const route = (quoteData.routePlan && quoteData.routePlan.map(r => r.swapInfo?.label || 'DEX').join(' -> ')) || 'Jupiter Aggregator';
      const priceImpact = quoteData.priceImpactPct ? parseFloat(quoteData.priceImpactPct).toFixed(4) + '%' : '--';

      document.getElementById('quoteOutputAmount').textContent = outAmount + ' ' + outputSelect.options[outputSelect.selectedIndex].text;
      document.getElementById('quoteSlippage').textContent = slippage;
      document.getElementById('quoteRoute').textContent = route;
      document.getElementById('quotePriceImpact').textContent = priceImpact;
      resultDiv.style.display = 'grid';
    } else {
      throw new Error('No quote returned');
    }
  } catch (err) {
    if (errorDiv) { errorDiv.textContent = 'Quote error: ' + (err.message || err); errorDiv.style.display = 'block'; }
    if (resultDiv) resultDiv.style.display = 'none';
  } finally {
    if (btn) { btn.disabled = false; const lang = document.documentElement.lang || 'en'; btn.textContent = (I18N[lang]||I18N.en).get_quote || 'Get Quote'; }
  }
}

function getTokenDecimals(mint) {
  const map = {
    'So11111111111111111111111111111111111111112': 9,
    'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB': 6,
    'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v': 6,
    '9gP2kCy3wA1ctvYWQk75guqXuHfrEomqydHLtcTCqiLa': 8,
    'GbbesPbaYh5uiAZSYNXTc7w9jty1rpg3P9L4JeN4LkKc': 6,
    '7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs': 8,
    '3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh': 8,
    '7GQnqthWKa5v2GqXYWhmgWZY5mCRrniwK3Xuinm9GKw5': 6,
    'DqfoyZH96RnvZusSp3Cdncjpyp3C74ZmJzGhjmHnDHRH': 9
  };
  return map[mint] || 6;
}

// ===== Live Market Cap Data System =====
let liveTokenCache = [];
let liveDataStatus = 'idle';
let liveDataLastFetch = null;
let liveDataSource = '';

// Format numbers for display
function fmtPrice(p){ if(p==null||p===undefined)return '--'; return '$'+(p>=1?p.toFixed(2):p.toFixed(6)); }
function fmtMcap(m){ if(m==null||m===undefined)return '--'; if(m>=1e9)return '$'+(m/1e9).toFixed(2)+'B'; if(m>=1e6)return '$'+(m/1e6).toFixed(1)+'M'; return '$'+m.toFixed(0); }
function fmtVol(v){ return fmtMcap(v); }
function fmtChg(c){ if(c==null||c===undefined)return '--'; return (c>=0?'+':'')+c.toFixed(2)+'%'; }

// Fetch market cap via backend proxy
async function fetchMarketCapData(range){
  liveDataStatus='loading';
  updateMcapStatus();
  try{
    const resp = await fetch(API_BASE + '/api/tokens/market-cap?range=' + range);
    if (!resp.ok) throw new Error('API error: ' + resp.status);
    const data = await resp.json();
    const tokenArray = Array.isArray(data) ? data : (data.data || []);
    if (!Array.isArray(tokenArray)) throw new Error('Invalid response');

    liveTokenCache = tokenArray.map((t,i)=>({
      rank:i+1,
      name:t.name||'--',
      symbol:(t.symbol||'--').toUpperCase(),
      price:t.current_price,
      mcap:t.market_cap,
      vol:t.total_volume,
      chg1d:t.price_change_percentage_24h,
      chg7d:t.price_change_percentage_7d_in_currency,
      chg30d:t.price_change_percentage_30d_in_currency,
      chg1h:t.price_change_percentage_1h_in_currency,
      img:t.image||'',
      id:t.id||'',
      orb:'https://orbmarkets.io/token/'+(t.platforms&&t.platforms.solana?t.platforms.solana:(t.id||'')),
      cg:'https://www.coingecko.com/en/coins/'+(t.id||'')
    }));
    liveDataStatus='success';
    liveDataSource='Server';
    liveDataLastFetch=new Date();
    renderMcapFromCache(range);
  }catch(err){
    liveDataStatus='error';
    updateMcapStatus();
    if(liveTokenCache.length>0){
      liveDataSource='cache';
      renderMcapFromCache(range);
    }else{
      renderMcapFallback(range);
    }
  }
}

// Render market cap table from live cache
function renderMcapFromCache(range){
  currentRange=range;
  const body=document.getElementById('mcapBody');
  const showCount = Math.min(range, liveTokenCache.length);
  if(showCount===0){
    body.innerHTML='<tr><td colspan="8" class="mcap-loading" data-i18n="loading">Loading token data...</td></tr>';
    return;
  }
  const period = (document.getElementById('periodSelect')||{}).value || 'daily';
  const chgField = period==='weekly'?'chg7d':period==='monthly'?'chg30d':'chg1d';
  body.innerHTML = liveTokenCache.slice(0,showCount).map((t,i)=>{
    const chg = t[chgField];
    const chgColor = (chg!=null&&chg>=0)?'var(--accent)':'#ff6b6b';
    return '<tr class="fade-in">'+
      '<td class="rank-col">'+(i+1)+'</td>'+
      '<td>'+(t.img?'<img src="'+t.img+'" style="width:18px;height:18px;border-radius:50%;display:inline-block;vertical-align:middle;margin-right:6px" alt="">':'')+t.name+'</td>'+
      '<td><strong>'+t.symbol+'</strong></td>'+
      '<td class="price-col">'+fmtPrice(t.price)+'</td>'+
      '<td>'+fmtMcap(t.mcap)+'</td>'+
      '<td>'+fmtVol(t.vol)+'</td>'+
      '<td style="color:'+chgColor+'">'+fmtChg(chg)+'</td>'+
      '<td>'+
        '<a href="'+t.orb+'" target="_blank" style="font-size:.75rem">OrbMarkets</a>'+
        '<a href="'+t.cg+'" target="_blank" style="font-size:.75rem;margin-left:4px">CG</a>'+
      '</td>'+
    '</tr>';
  }).join('');
  if(range>showCount){
    body.innerHTML += '<tr><td colspan="8" style="text-align:center;color:var(--text2);padding:16px;font-size:.85rem">'+
      '<span data-i18n="mcap_more">Showing '+showCount+' of '+range+'. View full list:</span>'+
      '<a href="https://www.coingecko.com/en?category=solana-ecosystem&page='+Math.ceil(range/100)+'" target="_blank">CoinGecko</a> | '+
      '<a href="https://coinmarketcap.com/view/solana-ecosystem" target="_blank">CoinMarketCap</a> | '+
      '<a href="https://birdeye.so/chain/solana" target="_blank">Birdeye</a>'+
    '</td></tr>';
  }
  updateMcapTimestamp();
  updateMcapStatus();
}

// Fallback rendering
function renderMcapFallback(range){
  const body=document.getElementById('mcapBody');
  const fallback = [
    {name:'Solana',symbol:'SOL',orb:'https://orbmarkets.io/token/So11111111111111111111111111111111111111112',cg:'https://www.coingecko.com/en/coins/solana'},
    {name:'Earth Coin',symbol:'EACO',orb:'https://orbmarkets.io/token/DqfoyZH96RnvZusSp3Cdncjpyp3C74ZmJzGhjmHnDHRH',cg:'https://www.coingecko.com/en/coins/eaco'},
    {name:'USD Coin',symbol:'USDC',orb:'https://orbmarkets.io/token/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',cg:'https://www.coingecko.com/en/coins/usd-coin'},
    {name:'Tether',symbol:'USDT',orb:'https://orbmarkets.io/token/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',cg:'https://www.coingecko.com/en/coins/tether'},
    {name:'Wrapped BTC',symbol:'wBTC',orb:'https://orbmarkets.io/token/3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh',cg:'https://www.coingecko.com/en/coins/wrapped-bitcoin'},
    {name:'Wrapped ETH',symbol:'wETH',orb:'https://orbmarkets.io/token/7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs',cg:'https://www.coingecko.com/en/coins/wrapped-ether'},
    {name:'Wrapped BNB',symbol:'wBNB',orb:'https://orbmarkets.io/token/9gP2kCy3wA1ctvYWQk75guqXuHfrEomqydHLtcTCqiLa',cg:'https://www.coingecko.com/en/coins/bnb'},
    {name:'TRON',symbol:'TRX',orb:'https://orbmarkets.io/token/GbbesPbaYh5uiAZSYNXTc7w9jty1rpg3P9L4JeN4LkKc',cg:'https://www.coingecko.com/en/coins/tron'},
    {name:'eCNH',symbol:'eCNH',orb:'https://orbmarkets.io/token/7GQnqthWKa5v2GqXYWhmgWZY5mCRrniwK3Xuinm9GKw5',cg:'#'},
  ];
  body.innerHTML = fallback.map((t,i)=>'<tr><td class="rank-col">'+(i+1)+'</td><td>'+t.name+'</td><td><strong>'+t.symbol+'</strong></td><td class="price-col">API offline</td><td>--</td><td>--</td><td>--</td><td><a href="'+t.orb+'" target="_blank" style="font-size:.75rem">OrbMarkets</a></td></tr>').join('');
  body.innerHTML += '<tr><td colspan="8" style="text-align:center;color:var(--text2);padding:16px;font-size:.85rem">'+
    '<span data-i18n="api_error">API temporarily unavailable. Please check:</span>'+
    '<a href="https://www.coingecko.com/en?category=solana-ecosystem" target="_blank">CoinGecko</a> | '+
    '<a href="https://coinmarketcap.com/view/solana-ecosystem" target="_blank">CoinMarketCap</a> | '+
    '<a href="https://birdeye.so/chain/solana" target="_blank">Birdeye</a>'+
  '</td></tr>';
}

function updateMcapStatus(){
  const el=document.getElementById('mcapApiStatus');
  if(!el)return;
  const statusMap={
    idle:{text:'Ready',color:'#8892b8'},
    loading:{text:'Fetching live data...',color:'var(--accent)'},
    success:{text:'Live data ('+liveDataSource+')',color:'var(--accent)'},
    error:{text:'API error - using fallback',color:'#ff6b6b'},
    rate_limited:{text:'Rate limited - using cache',color:'#f0ad4e'}
  };
  const s=statusMap[liveDataStatus]||statusMap.idle;
  el.innerHTML='<span class="update-dot"></span>'+s.text;
  el.style.color=s.color;
}

function updateMcapTimestamp(){
  const el=document.getElementById('lastUpdate');
  if(el){const now=liveDataLastFetch||new Date();el.textContent=now.toLocaleDateString()+' '+now.toLocaleTimeString();}
}

// ===== Render DEX Cards =====
function renderDEX(){
  const grid=document.getElementById('dexGrid');
  grid.innerHTML=DEX_LIST.map(d=>'<div class="dex-card fade-in">'+
    '<span class="dex-rank">'+d.rank+'</span>'+
    '<div class="dex-name">'+d.name+'</div>'+
    '<div class="dex-type">'+d.type+'</div>'+
    '<div class="dex-desc">'+d.desc+'</div>'+
    '<a href="'+d.url+'" target="_blank" class="dex-link">'+d.url.replace('https://','')+'</a>'+
    '<div class="dex-stats">'+
      '<span>TVL: <strong>'+d.tvl+'</strong></span>'+
      '<span>24h: <strong>'+d.vol+'</strong></span>'+
    '</div>'+
  '</div>').join('');
}

// ===== Render Explorer Cards =====
function renderExplorers(){
  const grid=document.getElementById('explorerGrid');
  if(!grid)return;
  grid.innerHTML=EXPLORER_LIST.map(e=>'<div class="dex-card fade-in">'+
    '<span class="dex-rank">'+e.rank+'</span>'+
    '<div class="dex-name">'+e.name+'</div>'+
    '<div class="dex-type">'+e.type+'</div>'+
    '<div class="dex-desc">'+e.desc+'</div>'+
    '<a href="'+e.url+'" target="_blank" class="dex-link">'+e.url.replace('https://','').replace('www.','')+'</a>'+
    '<div class="dex-stats">'+
      '<span>Features: <strong>'+e.feat+'</strong></span>'+
      '<span>TPS: <strong>'+e.tps+'</strong></span>'+
    '</div>'+
  '</div>').join('');
  const eu=document.getElementById('explorerUpdate');
  if(eu){const now=new Date();eu.textContent=now.toLocaleDateString()+' '+now.toLocaleTimeString();}
}

// ===== Render Token Cards =====
let currentTab='all';
function renderTokens(tab){
  currentTab=tab;
  const filtered = tab==='all' ? TOKEN_LIST : TOKEN_LIST.filter(t=>t.cat===tab);
  const grid=document.getElementById('tokenGrid');
  grid.innerHTML=filtered.map(t=>'<div class="token-card fade-in">'+
    '<div class="token-icon '+t.cls+'">'+t.symbol.slice(0,2)+'</div>'+
    '<div class="token-info">'+
      '<h4>'+t.symbol+'</h4>'+
      '<p>'+t.name+'</p>'+
      '<div class="token-links">'+
        '<a href="'+t.orb+'" target="_blank">OrbMarkets</a>'+
        '<a href="'+t.dex+'" target="_blank">Swap</a>'+
        '<a href="'+t.scan+'" target="_blank">Scan</a>'+
      '</div>'+
    '</div>'+
  '</div>').join('');
}

// ===== Render Market Cap Table =====
let currentRange=100;
function renderMcap(range){
  currentRange=range;
  const body=document.getElementById('mcapBody');
  body.innerHTML='<tr><td colspan="8" class="mcap-loading" data-i18n="loading">Loading token data...</td></tr>';
  if(liveTokenCache.length>0){
    renderMcapFromCache(range);
    if(!liveDataLastFetch||(new Date()-liveDataLastFetch)>3600000){
      fetchMarketCapData(range);
    }
  }else{
    fetchMarketCapData(range);
  }
}

// ===== Language Switching =====
function applyLang(lang){
  const dict=I18N[lang]||I18N.en;
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key=el.dataset.i18n;
    if(dict[key])el.textContent=dict[key];
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el=>{
    const key=el.dataset.i18nPh;
    if(dict[key])el.placeholder=dict[key];
  });
  document.documentElement.dir = lang==='ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;
  try{localStorage.setItem('eacoswap_lang',lang)}catch(e){}
  updateWalletButton();
}

// ===== Theme Switching =====
function applyTheme(theme){
  document.body.dataset.theme=theme;
  try{localStorage.setItem('eacoswap_theme',theme)}catch(e){}
  if(theme==='cosmic')renderStars();
}

// ===== Stars Background =====
function renderStars(){
  const bg=document.getElementById('starsBg');
  if(!bg)return;
  bg.innerHTML='';
  for(let i=0;i<80;i++){
    const s=document.createElement('div');
    s.className='star';
    const size=Math.random()*2+1;
    s.style.width=size+'px';
    s.style.height=size+'px';
    s.style.left=Math.random()*100+'%';
    s.style.top=Math.random()*100+'%';
    s.style.setProperty('--dur',(Math.random()*3+2)+'s');
    s.style.animationDelay=Math.random()*3+'s';
    bg.appendChild(s);
  }
}

// ===== Search =====
function performSearch(){
  const q=document.getElementById('searchInput').value.toLowerCase().trim();
  if(!q)return;
  const dexMatch=DEX_LIST.filter(d=>d.name.toLowerCase().includes(q)||d.type.toLowerCase().includes(q));
  const tokMatch=TOKEN_LIST.filter(t=>t.symbol.toLowerCase().includes(q)||t.name.toLowerCase().includes(q));
  if(dexMatch.length>0){
    document.getElementById('dexSection').scrollIntoView({behavior:'smooth'});
    const grid=document.getElementById('dexGrid');
    grid.innerHTML=dexMatch.map(d=>'<div class="dex-card fade-in">'+
      '<span class="dex-rank">'+d.rank+'</span>'+
      '<div class="dex-name">'+d.name+'</div>'+
      '<div class="dex-type">'+d.type+'</div>'+
      '<div class="dex-desc">'+d.desc+'</div>'+
      '<a href="'+d.url+'" target="_blank" class="dex-link">'+d.url.replace('https://','')+'</a>'+
      '<div class="dex-stats"><span>TVL: <strong>'+d.tvl+'</strong></span><span>24h: <strong>'+d.vol+'</strong></span></div>'+
    '</div>').join('');
  }else if(tokMatch.length>0){
    document.getElementById('exchangeSection').scrollIntoView({behavior:'smooth'});
    renderTokens('all');
    document.querySelectorAll('.token-card').forEach(card=>{
      const text=card.textContent.toLowerCase();
      card.style.opacity = text.includes(q)?'1':'0.3';
    });
  }else{
    window.open('https://jup.ag/swap/SOL-'+q.toUpperCase(),'_blank');
  }
}

// ===== Auto-detect browser language =====
function detectLang(){
  const bl=navigator.language||navigator.userLanguage||'en';
  const code=bl.slice(0,2);
  const supported=['en','zh','es','ar','fr','ru'];
  return supported.includes(code)?code:'en';
}

// ===== Fetch live SOL price via backend =====
async function fetchSolPrice(){
  try {
    const resp = await fetch(API_BASE + '/api/sol-price');
    if (!resp.ok) throw new Error('API error');
    const d = await resp.json();
    if (d && d.data && d.data.solana && d.data.solana.usd !== undefined) {
      document.getElementById('statSolPrice').textContent = '$' + parseFloat(d.data.solana.usd).toFixed(2);
    }
  } catch (e) {
    // fallback
  }

  // Fetch SPL token count via backend or direct RPC
  const rpcUrl = getHeliusRpcUrl();
  try {
    const resp = await fetch(rpcUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'getProgramAccounts', params: ['TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA', { encoding: 'base64', filters: [{ dataSize: 82 }] }] })
    });
    const d = await resp.json();
    const count = d?.result?.length || 100000;
    document.getElementById('statTokens').textContent = count > 1000 ? (count / 1000).toFixed(0) + 'K+' : count.toLocaleString();
  } catch (e) { document.getElementById('statTokens').textContent = '100K+'; }

  // Fetch EACO holders count
  try {
    const resp = await fetch(rpcUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0', id: 2,
        method: 'getProgramAccounts',
        params: ['TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA', {
          encoding: 'base64',
          filters: [
            { dataSize: 165 },
            { memcmp: { offset: 0, bytes: 'DqfoyZH96RnvZusSp3Cdncjpyp3C74ZmJzGhjmHnDHRH' } }
          ]
        }]
      })
    });
    const d = await resp.json();
    const holders = d?.result?.length;
    if (holders) {
      const el = document.getElementById('statEacoHolders');
      if (el) el.textContent = holders.toLocaleString();
    }
  } catch (e) { }
}

// ===== Auto-update =====
function setupAutoUpdate(){
  const now=new Date();
  document.getElementById('lastUpdate').textContent=now.toLocaleDateString()+' '+now.toLocaleTimeString();
  setInterval(()=>{ fetchSolPrice(); },300000);
  setInterval(()=>{
    if(liveDataStatus!=='loading'){ fetchMarketCapData(currentRange); }
  },3600000);
  let nextUpdate=Date.now()+3600000;
  setInterval(()=>{
    const remaining=Math.max(0,nextUpdate-Date.now());
    const mins=Math.floor(remaining/60000);
    const secs=Math.floor((remaining%60000)/1000);
    const el=document.getElementById('nextUpdateCountdown');
    if(el)el.textContent=mins+':'+String(secs).padStart(2,'0');
    if(remaining<=0){nextUpdate=Date.now()+3600000;}
  },1000);
}

// ===== Helius API Key Management =====
const HELIUS_KEY_STORAGE='eacoswap_helius_key';
const PROXY_TOGGLE_STORAGE='eacoswap_use_proxy';

function getHeliusKey(){
  try{return localStorage.getItem(HELIUS_KEY_STORAGE);}catch(e){return null;}
}
function setHeliusKey(k){
  if(k&&k.trim()){try{localStorage.setItem(HELIUS_KEY_STORAGE,k.trim());}catch(e){}}
}
function removeHeliusKey(){
  try{localStorage.removeItem(HELIUS_KEY_STORAGE);}catch(e){}
}
function saveHeliusKey(){
  const input=document.getElementById('heliusKeyInput');
  const key=input?input.value.trim():'';
  const status=document.getElementById('heliusStatus');
  if(!key){if(status)status.textContent='Please enter a key first'; return;}
  setHeliusKey(key);
  if(input)input.value='';
  if(status)status.textContent='Helius API key saved to browser localStorage';
}
function clearHeliusKey(){
  removeHeliusKey();
  const input=document.getElementById('heliusKeyInput');
  const status=document.getElementById('heliusStatus');
  if(input)input.value='';
  if(status)status.textContent='Helius API key cleared';
}
function restoreHeliusKey(){
  const key=getHeliusKey();
  const status=document.getElementById('heliusStatus');
  if(key&&status)status.textContent='Helius API key configured (****'+key.slice(-4)+')';
  // restore proxy toggle
  try {
    const proxyVal = localStorage.getItem(PROXY_TOGGLE_STORAGE);
    const el = document.getElementById('useServerProxy');
    if (el && proxyVal !== null) el.checked = proxyVal === 'true';
  } catch(e){}
}

function saveProxyToggle() {
  try {
    const el = document.getElementById('useServerProxy');
    if (el) localStorage.setItem(PROXY_TOGGLE_STORAGE, String(el.checked));
  } catch(e){}
}

// ===== Event Listeners =====
document.addEventListener('DOMContentLoaded',()=>{
  renderDEX();
  renderTokens('all');
  renderMcap(100);
  renderExplorers();
  renderStars();
  fetchSolPrice();
  setupAutoUpdate();
  restoreHeliusKey();
  initWallet();
  initSwapQuote();

  // Language buttons
  document.querySelectorAll('.lang-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('.lang-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      applyLang(btn.dataset.lang);
    });
  });

  // Theme buttons
  document.querySelectorAll('.theme-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('.theme-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      applyTheme(btn.dataset.theme);
    });
  });

  // Exchange tabs
  document.querySelectorAll('.exchange-tab').forEach(tab=>{
    tab.addEventListener('click',()=>{
      document.querySelectorAll('.exchange-tab').forEach(t=>t.classList.remove('active'));
      tab.classList.add('active');
      renderTokens(tab.dataset.tab);
    });
  });

  // Market cap range buttons
  document.querySelectorAll('.mcap-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('.mcap-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      renderMcap(parseInt(btn.dataset.range));
    });
  });

  // Period select
  const ps=document.getElementById('periodSelect');
  if(ps){ps.addEventListener('change',()=>{renderMcap(currentRange);});}

  // Search on Enter
  document.getElementById('searchInput').addEventListener('keypress',e=>{
    if(e.key==='Enter')performSearch();
  });

  // Proxy toggle listener
  const proxyEl = document.getElementById('useServerProxy');
  if (proxyEl) proxyEl.addEventListener('change', saveProxyToggle);

  // Restore preferences
  try{
    const savedLang=localStorage.getItem('eacoswap_lang');
    const savedTheme=localStorage.getItem('eacoswap_theme');
    if(savedLang){
      document.querySelectorAll('.lang-btn').forEach(b=>{
        b.classList.toggle('active',b.dataset.lang===savedLang);
      });
      applyLang(savedLang);
    }else{
      const auto=detectLang();
      document.querySelectorAll('.lang-btn').forEach(b=>{
        b.classList.toggle('active',b.dataset.lang===auto);
      });
      applyLang(auto);
    }
    if(savedTheme){
      document.querySelectorAll('.theme-btn').forEach(b=>{
        b.classList.toggle('active',b.dataset.theme===savedTheme);
      });
      applyTheme(savedTheme);
    }
  }catch(e){}
});
