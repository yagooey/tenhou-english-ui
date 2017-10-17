/*global window,chrome,MutationObserver*/
/*jslint browser,for,single,white*/

const translationTableExact = {
  'EMA': {
    // Yaku
    '立直': 'Riichi',
    '赤ドラ': 'Red fives',
    '斷么九': 'All simples', // for stats screen
    '断幺九': 'All simples',
    '平和': 'Pinfu',
    '門前清自摸和': 'Self-drawn fully concealed',
    '裏ドラ': 'Uradora',
    '一發': 'One-shot',
    '一発': 'One-shot', // for stats screen
    '場風 東': 'E Round Wind',
    '役牌 中': 'Red dragons',
    '役牌 發': 'Green dragons',
    '役牌 白': 'White dragons',
    '混一色': 'Half flush',
    '一盃口': 'Pure Double Chow',
    '三色同順': 'Mixed Triple Chow',
    '對對和': 'All pungs',
    '対々和': 'All pungs', // for stats screen
    '自風 東': 'E Seat wind',
    '七對子': '7 pairs',
    '七対子': '7 pairs', // for stats screen
    '自風 南': 'S Seat wind',
    '自風 西': 'W Seat wind',
    '四槓子': 'Four kongs',
    '自風 北': 'N Seat wind',
    '清一色': 'Full flush',
    '三暗刻': '3 concealed pungs',
    '河底撈魚': 'Bottom of the sea (discard)',
    '混全帶么九': 'Outside hand',
    '混全帯幺九': 'Outside hand', // for stats screen
    '海底摸月': 'Bottom of the sea (drawn)',
    '嶺上開花': 'After a kong',
    '兩立直': 'Double riichi',
    '両立直': 'Double riichi', // for stats screen
    '場風 南': 'S Round wind',
    '場風 西': 'W Round wind',
    '場風 北': 'N Round wind',
    '小三元': 'Little 3 dragons',
    '混老頭': 'Only terminals & honours',
    '槍槓': 'Robbing a kong',
    '一氣通貫': 'Pure straight',
    '一気通貫': 'Pure straight', // for stats screen
    '二盃口': 'Twice pure double chow',
    '三色同刻': 'Triple Pung',
    '大三元': '3 dragons',
    '純全帶么九': 'Terminals in all sets',
    '純全帯幺九': 'Terminals in all sets', // for stats screen
    '四暗刻': '4 concealed pungs',
    '國士無雙': '13 orphans',
    '國士無雙13面': '13 orphans x13',
    '国士無双': '13 orphans',  // for stats screen
    '国士無双１３面': '13 orphans x13',  // for stats screen
    '小四喜': 'Little 4 winds',
    '字一色': 'All honours',
    '三槓子': 'Three kongs',
    '四暗刻單騎': '4 concealed pungs, pair wait',
    '四暗刻単騎': '4 concealed pungs, pair wait',  // for stats screen
    '綠一色': 'All green',
    '緑一色': 'All green', // for stats screen
    '九蓮宝燈': '9 gates',
    '九蓮寶燈': '9 gates', // for stats screen
    '純正九蓮宝燈': '9 gates x9',
    '純正九蓮寶燈': '9 gates x9', // for stats screen
    '清老頭': 'All terminals',
    '地和': "Earth's blessing",
    '大四喜': 'Big 4 winds',
    '天和': "Heaven's blessing",
    '人和': "Man's blessing",
    '数え役満': 'Counted yakuman',
    
    // practice play options
    '四般東喰赤速': '4p E-only fast',
    '(４人打 東風 喰断アリ 赤アリ 速)': "4p East, fast against 3 bots (bots don't try to win)",

    '四般東喰赤': '4p E-only',
    '(４人打 東風 喰断アリ 赤アリ)': '4p East only, play against 3 bots',

    '三般東喰赤': '3p E-only',
    '(３人打 東風 喰断アリ 赤アリ)': '3p East only, play against 2 bots',

    '四若東速祝５': '4p E-only fast + shuugi',
    '(４人打 東風 喰断アリ 赤アリ 祝儀)': '4p East only, fast, 3 bots, with parlor bonuses (shuugi)',

    '三若東速祝５': '3p E-only fast + shuugi ',
    '(３人打 東風 喰断アリ 赤アリ 祝儀)': '3p East only, fast play against 2 bots, shuugi',

    // double yakuman TOFIX not currently exhaustive

    '小四喜 字一色': 'Little 4 winds + all honours',
    '大四喜 字一色': 'Big 4 winds + all honours',
    '大三元 四暗刻': '3 dragons + 4 concealed pungs',
    '大三元 字一色': '3 dragons + all honours',
    '小四喜 四暗刻単騎': 'Little 4 winds + 4 concealed pungs, pair wait',
    '四暗刻単騎 清老頭': '4 concealed pungs, pair wait + All terminals'

  },
  'rad': {
    '立直': 'Ready-riichi',
    '平和': 'Pinfu no-point',
    '拔き': 'North is dora',
    '東風+4局サドンデス': 'East',
    '東南+4局サドンデス': 'East & South',
    'ウマ': 'Placement bonus',
    '1本場': 'continuation',
    '後': 'after discard',
    '明槓ドラ': 'Reveal dora on open kan',
    '喰断': 'Open all-simples',
    '東西場': 'E-W round seat',
    '和了止め': 'End on dealer win',
    '聴牌止め': 'End on dealer ready',
    '収支': 'Parlor income',
    '祝儀': 'Parlor bonuses',
    '平均': 'Average',
    '平均収支': 'Avg parlor income',
    '平均祝儀': 'Avg parlor bonuses'
  },
  'romaji': {
    // Main
    '天鳳 / Web版': 'Tenhou / Web version',
    '【イベント告知】': '<Event Notice>',
    'お試しゲストログイン': 'Guest Login',
    '新規ID登録': 'New ID',
    'IDで続きから': 'Existing ID',
    '【入力方法の調整を行っています】': 'Input method has been successfully changed',
    '希望の入力方法ではない場合には': 'If your desired input method is not chosen, ',
    '「設定」から変更をお願いいたします。': 'you can change it via settings.',
    '新規ID': 'New ID',
    'フリテン': 'Furiten',
    '男': 'Male',
    '女': 'Female',
    'ID変更': 'Change ID',
    '設定': 'Settings',
    'ロビーの移動': 'Change lobby',
    'ツモ': 'Tsumo',
    'ロン': 'Ron',
    'リーチ': 'Riichi',
    '拔き': 'Nuki',
    '流局': 'Redeal',
    'カン': 'Kan',
    '終了': 'Quit',
    '視 ': 'View pt. ',
    '局 ': 'Round ',
    '巡 ': 'Turn ',
    'ランキング戦': 'Ranked Play',
    '(段位戦、雀荘戦)': '(Ranked, Parlor)',
    'イベント会場１': 'Event Venue 1',
    '(公式イベントで使用します)': '(Official events)',
    'イベント会場２': 'Event Venue 2',
    'その他': 'Others',
    '(個室番号を指定してロビーを移動します)': '(Go to a private lobby)',
    'ロビーの新規作成': 'Create lobby',
    '(天鳳サイトの個室作成ページを開きます)': '(Link to the lobby creation page)',
    'このプレーヤは既に接続済みです。しばらく経ってから接続してください。(ERR1004)': 'This account is already logged in. Please try again later. (ERR1004)',
    '再接続しますか？': 'Reconnect?',
    'Wi-Fi(無線LAN)やbluetoothは電子レンジや近隣利用者の影響を受け接続が切れる場合があります': 'The connection may be broken due to interference of microwave ovens or neighboring users',
    '入力してあるIDをクリアしますがよろしいですか？IDを紛失しないようにコピーしてください。': 'Clear the login ID field? Please consider keeping a copy of the ID to avoid losing it',
    
    // practice play options
    '四般東喰赤速': '4p tonpuusen fast',
    '(４人打 東風 喰断アリ 赤アリ 速)': '4p tonpuusen, fast play against 3 tsumobots',

    '四般東喰赤': '4p tonpuusen',
    '(４人打 東風 喰断アリ 赤アリ)': '4p tonpuusen, play against 3 tsumobots',

    '三般東喰赤': 'Sanma tonpuusen',
    '(３人打 東風 喰断アリ 赤アリ)': 'Sanma tonpuusen, play against 2 tsumobots',

    '四若東速祝５': '4p tonpuusen fast + shuugi',
    '(４人打 東風 喰断アリ 赤アリ 祝儀)': '4p tonpuusen, fast play against 3 tsumobots, shuugi',

    '三若東速祝５': 'Sanma tonpuusen fast + shuugi ',
    '(３人打 東風 喰断アリ 赤アリ 祝儀)': 'Sanma tonpuusen, fast play against 2 tsumobots, shuugi',

    // Settings
    '環境': 'Environment',
    ' / 設定': ' / Settings',
    '画面方向:回転': 'Screen orientation:Rotate',
    '画面方向:Default': 'Screen orientation:Default',
    '※アプリ版でのみご利用いただけます': '※Only applicable in App version',
    '配信ID保護': 'ID protection for live stream',
    '※ログイン画面のID入力を非表示にします': '※Makes your ID hidden on the login page',
    '入力補助:Default': 'Input Assist: Default',
    '入力補助:3TAP': 'Input Assist: 3TAP',
    '入力補助:2TAP': 'Input Assist: 2TAP',
    '※縦画面のみで表示されます': '※Only displayed when in portrait view',
    '牌山表示:Default': 'Show Wall:Default',
    '牌山表示:あり': 'Show Wall:On',
    '牌山表示:なし': 'Show Wall:Off',
    'SEなし': 'No SE',
    '卓': 'Table',
    '標準の画像': 'Use default BG image',
    '画像URL:': 'Image URL:',
    '牌': 'Tile',
    '牌背色:': 'Tile Colour',
    // Lobby
    '●アドレスバーを小さくするには下にスクロールしてからゆっくり上にスクロールします(機種依存あり)●OK/パス/ツモ切りは右クリックまたはダブルタップ': 'To make the address bar smaller, scroll down, then slowly scroll up (depends on the device). Right click or double tap to trigger Confirm / Pass / Auto Discard.',
    '※下の«»でタブを移動してください。': 'Use the «» buttons below to navigate',
    '接続:': 'Online:',
    '待機:': 'Idle:',
    '終局:': 'Last:',
    '有効期限:': 'Expire: ',
    '段級位を取得するには': 'Please register an ID in order',
    '「新規ID」登録が必要です': 'to be qualified for rankings',
    'テストプレイ': 'Practice play against the computer',
    '対戦': 'Play',
    '予約': 'Queue',
    '1位': '1st',
    '2位': '2nd',
    '3位': '3rd',
    '4位': '4th',
    '四麻:': '4P',
    '三麻:': '3P',
    '東風+4局サドンデス': 'east + 4 rounds of sudden death',
    '東南+4局サドンデス': 'east south + 4 rounds of sudden death',
    'ウマ': 'Uma',
    '1本場': 'Honba',
    '後': 'after',
    '明槓ドラ': 'Mindora',
    '喰断': 'Kuitan',
    '東西場': 'Tonshaba',
    '和了止め': 'Agariyame',
    '聴牌止め': 'Tenpaiyame',
    '月間戦績': 'Monthly Stats',
    '通算': 'Raw',
    '得点': 'Points',
    '順位': 'Placement',
    '収支': 'Income',
    '祝儀': 'Shuugi',
    '平均': 'Average',
    'トップ': 'Top rt',
    '連対率': 'Rentai',
    'ラス率': 'Last rt',
    '総合': 'Total',
    '※段位戦４人打ち合算戦績': '※Summary of ranked 4P games',
    '※段位戦３人打ち合算戦績': '※Summary of ranked 3P games',
    '※表示する対戦ルールを選択してください': 'Choose a game type to display its stats',
    '通算戦績': 'Raw Stats',
    '１位率': '1st rt',
    '２位率': '2nd rt',
    '３位率': '3rd rt',
    '４位率': '4th rt',
    '飛び率': 'Bust rt',
    '平均得点': 'Avg points',
    '平均順位': 'Avg placing',
    '平均収支': 'Avg income',
    '平均祝儀': 'Avg shuugi',
    '和了率': 'Win rt',
    '放銃率': 'Deal-in rt',
    '副露率': 'Call rt',
    '立直率': 'Riichi rt',
    '牌譜': 'Replay',
    '牌譜 | ': 'Replay | ',
    '観戦': 'Spectate',
    '観戦 | ': 'Watch | ',
    'ヘルプ': 'Help',
    '牌理': 'Analyser',
    '料金のお支払い': 'Pay membership fee',
    '牌譜/観戦URLを入力してください': 'Enter URL of replay or live game',
    'ログイン画面の「新規ID」からIDを取得してください': 'Please first register an ID from the login page',
    '●「長押し」または「右クリック」から別タブで開く/URLのコピーなどが行えます': 'Long press or right click to bring up the context menu.',
    '●「長押し」または「右クリック」から別タブで開く/URLのコピーなどが行えます●観戦は５分遅れ': 'Long press or right click to bring up the context menu. Games are delayed five minutes in spectating mode.',
    '観戦可能な対戦はありません': 'There are no matches that can be watched.',
    '画像や音声がロードされていて正常に描画/再生可能かを確認するための機能です。もし異常があればゲームの進行に支障が出る場合がありますので、このページをリロードしてください。': 'You may use this feature to test whether image and sound files can be properly loaded. If there exists any abnormality which may hinder the progress of the game, please refresh this page.',
    '上級卓の入場条件(１級以上または有効期限60日以上)を満たしていません※七段R2000以上は入場できません': 'Must be at least 1 Kyuu to enter Joukyuu (Intermediate). ※Not available after 7 Dan & R2000',
    '特上卓の入場条件(四段R1800以上を満たしていません': 'Must be at least 4 Dan & R1800 to enter Tokujou (Expert).',
    '雀荘戦の入場条件(四段R1800以上の有料会員)を満たしていません': 'Must be at least 4 Dan & R1800 to enter Janso (Parlor). Not available to free players.',
    '鳳凰卓の入場条件(七段R2000以上の有料会員)を満たしていません': 'Must be at least 7 Dan & R2000 to enter Houou (Master). Not available to free players.',
    '上にゆっくりスクロールしてください': 'Scroll down slowly until this message disappears',
    // Game
    '對局': 'Start',
    '鳴きなし': 'No call',
    '自動理牌': 'Sort',
    '不聴宣言': 'Noten',
    '自動和了': 'Auto ron',
    'ツモ切り': 'Auto discard',
    'ポン': 'Pon',
    'チー': 'Chii',
    '槓': 'Kan',
    'キタ': 'Kita',
    '終局': 'End',
    '飜': 'Han',
    '符': 'Fu',
    '点': 'Points',
    // Yaku
    '門前清自摸和': 'Menzen tsumo',
    '立直': 'Riichi',
    '一發': 'Ippatsu',
    '一発': 'Ippatsu', // for stats screen
    '槍槓': 'Chankan',
    '嶺上開花': 'Rinshan kaihou',
    '海底摸月': 'Haitei raoyue',
    '河底撈魚': 'Houtei raoyui',
    '平和': 'Pinfu',
    '斷么九': 'Tanyao',
    '断幺九': 'Tanyao', // for stats screen
    '一盃口': 'Iipeikou',
    '自風 東': 'Jikaze Ton',
    '自風 南': 'Jikaze Nan',
    '自風 西': 'Jikaze Sha',
    '自風 北': 'Jikaze Pei',
    '場風 東': 'Bakaze Ton',
    '場風 南': 'Bakaze Nan',
    '場風 西': 'Bakaze Sha',
    '場風 北': 'Bakaze Pei',
    '役牌 白': 'Yakuhai Haku',
    '役牌 發': 'Yakuhai Hatsu',
    '役牌 中': 'Yakuhai Chun',
    '兩立直': 'Double riichi',
    '両立直': 'Double riichi', // for stats screen
    '七對子': 'Chiitoitsu',
    '七対子': 'Chiitoitsu', // for stats screen
    '混全帶么九': 'Chanta',
    '混全帯幺九': 'Chanta', // for stats screen
    '一氣通貫': 'Ikkitsuukan',
    '一気通貫': 'Ikkitsuukan', // for stats screen
    '三色同順': 'Sanshoku doujun',
    '三色同刻': 'Sanshoku doukou',
    '三槓子': 'Sankantsu',
    '對對和': 'Toitoi',
    '対々和': 'Toitoi', // for stats screen
    '三暗刻': 'Sanankou',
    '小三元': 'Shousangen',
    '混老頭': 'Honroutou',
    '二盃口': 'Ryanpeikou',
    '純全帶么九': 'Junchan',
    '純全帯幺九': 'Junchan', // for stats screen
    '混一色': 'Honitsu',
    '清一色': 'Chiniisou',
    '人和': 'Renhou',
    '天和': 'Tenhou',
    '地和': 'Chiihou',
    '大三元': 'Daisangen',
    '四暗刻': 'Suuankou',
    '四暗刻單騎': 'Suuankou tanki',
    '四暗刻単騎': 'Suuankou tanki',  // for stats screen
    '字一色': 'Tsuuiisou',
    '綠一色': 'Ryuuiisou',
    '緑一色': 'Ryuuiisou', // for stats screen
    '清老頭': 'Chinroutou',
    '九蓮寶燈': 'Chuuren poutou',
    '九蓮宝燈': 'Chuuren poutou', // for stats screen
    '純正九蓮宝燈': 'Junsei chuuren poutou',
    '純正九蓮寶燈': 'Junsei chuuren poutou', // for stats screen
    '國士無雙': 'Kokushi musou',
    '国士無双': '13 orphans',  // for stats screen
    '國士無雙13面': 'Kokushi musou 13 men',
    '国士無双１３面': '13 orphans x13',  // for stats screen
    '大四喜': 'Daisuushi',
    '小四喜': 'Shousuushi',
    '四槓子': 'Suukantsu',
    '数え役満': 'kazoe-yakuman',

    // double yakuman TOFIX not currently exhaustive

    '小四喜 字一色': 'Shousuushi + Tsuuiisou',
    '大四喜 字一色': 'Daisuushi + Tsuuiisou',
    '大三元 四暗刻': 'Daisangen + Suuankou',
    '大三元 字一色': 'Daisangen + Tsuuiisou',
    '小四喜 四暗刻単騎': 'Shousuushi + Suuankou tanki',
    '四暗刻単騎 清老頭': 'Suuankou tanki + Chinroutou',

    // dora

    'ドラ': 'Dora',
    '裏ドラ': 'Uradora',
    '赤ドラ': 'Akadora',

    // Replay & Spectating
    '待ち': 'Waits',
    '手牌': 'Hand',
    '牌山': 'Wall',
    '(匿名表示 ON)': '(ID Display ON)',
    '(匿名表示 OFF)': '(ID Display OFF)',
    // stats
    'ランキング': 'Summary stats',
    ' 接続人数': 'Players by hour (JST: UTC+9)',
    '接続人数': 'Players by hour',
    '※最大同時接続人数': 'Maximum number of simultaneous users',
    '役': 'Yaku and dora'

    // The following are commented out as they are only available in Japanese

    //'マニュアル': 'Manual',
    //'検索': 'Search this site',
  }
};

const translationTablePartial = {
  'EMA': {
    '四般東喰赤速': '4p Novice E Fst',
    '四般東喰赤': '4p Novice E',
    '四般南喰赤速': '4p Novice E+S Fst',
    '四般南喰赤': '4p Novice E+S',
    '三般東喰赤速': '3p Novice E Fst',
    '三般東喰赤': '3p Novice E',
    '三般南喰赤速': '3p Novice E+S Fst',
    '三般南喰赤': '3p Novice E+S',
    '四上東喰赤速': '4p Dan E Fst',
    '四上東喰赤': '4p Dan E',
    '四上南喰赤速': '4p Dan E+S Fst',
    '四上南喰赤': '4p Dan E+S',
    '三上東喰赤速': '3p Dan E Fst',
    '三上東喰赤': '3p Dan E',
    '三上南喰赤速': '3p Dan E+S Fst',
    '三上南喰赤': '3p Dan E+S',
    '四特東喰赤速': '4p Upperdan E Fst',
    '四特東喰赤': '4p Upperdan E',
    '四特南喰赤速': '4p Upperdan E+S Fst',
    '四特南喰赤': '4p Upperdan E+S',
    '三特東喰赤速': '3p Upperdan E Fst',
    '三特東喰赤': '3p Upperdan E',
    '三特南喰赤速': '3p Upperdan E+S Fst',
    '三特南喰赤': '3p Upperdan E+S',
    '四鳳東喰赤速': '4p Phoenix E Fst',
    '四鳳東喰赤': '4p Phoenix E',
    '四鳳南喰赤速': '4p 7Phoenix E+S Fst',
    '四鳳南喰赤': '4p Phoenix E+S',
    '三鳳東喰赤速': '3p Phoenix E Fst',
    '三鳳東喰赤': '3p Phoenix E',
    '三鳳南喰赤速': '3p Phoenix E+S Fst',
    '三鳳南喰赤': '3p Phoenix E+S',
    '四麻上級卓': '4p, Dan',
    '三麻上級卓': '3p, Dan',
    '四麻特上卓': '4p, Upperdan',
    '三麻特上卓': '3p, Upperdan',
    '四麻雀荘戦': '4p, Parlor',
    '三麻雀荘戦': '3p, Parlor',
    '四麻鳳凰卓': '4p, Phoenix',
    '三麻鳳凰卓': '3p, Phoenix'
  },
  'rad': {
    '新人': 'New',
    '９級': '9k',
    '８級': '8k',
    '７級': '７k',
    '６級': '６k',
    '５級': '５k',
    '４級': '４k',
    '３級': '３k',
    '２級': '２k',
    '１級': '１k',
    '初段': '1d',
    '二段': '2d',
    '三段': '3d',
    '四段': '4d',
    '五段': '5d',
    '六段': '6d',
    '七段': '7d',
    '八段': '8d',
    '九段': '9d',
    '十段': '10d',
    '天鳳位': 'Immortal',
    '四般東喰赤速': '4p Novice E Fst',
    '四般東喰赤': '4p Novice E',
    '四般南喰赤速': '4p Novice E+S Fst',
    '四般南喰赤': '4p Novice E+S',
    '三般東喰赤速': '3p Novice E Fst',
    '三般東喰赤': '3p Novice E',
    '三般南喰赤速': '3p Novice E+S Fst',
    '三般南喰赤': '3p Novice E+S',
    '四上東喰赤速': '4p 1k+ E Fst',
    '四上東喰赤': '4p 1k+ E',
    '四上南喰赤速': '4p 1k+ E+S Fst',
    '四上南喰赤': '4p 1k+ E+S',
    '三上東喰赤速': '3p 1k+ E Fst',
    '三上東喰赤': '3p 1k+ E',
    '三上南喰赤速': '3p 1k+ E+S Fst',
    '三上南喰赤': '3p 1k+ E+S',
    '四特東喰赤速': '4p 4d1800+ E Fst',
    '四特東喰赤': '4p 4d1800+ E',
    '四特南喰赤速': '4p 4d1800+ E+S Fst',
    '四特南喰赤': '4p 4d1800+ E+S',
    '三特東喰赤速': '3p 4d1800+ E Fst',
    '三特東喰赤': '3p 4d1800+ E',
    '三特南喰赤速': '3p 4d1800+ E+S Fst',
    '三特南喰赤': '3p 4d1800+ E+S',
    '四鳳東喰赤速': '4p 7d2000+ E Fst',
    '四鳳東喰赤': '4p 7d2000+ E',
    '四鳳南喰赤速': '4p 7d2000+ E+S Fst',
    '四鳳南喰赤': '4p 7d2000+ E+S',
    '三鳳東喰赤速': '3p 7d2000+ E Fst',
    '三鳳東喰赤': '3p 7d2000+ E',
    '三鳳南喰赤速': '3p 7d2000+ E+S Fst',
    '三鳳南喰赤': '3p 7d2000+ E+S',
    '四麻上級卓': '4p, 1k+',
    '三麻上級卓': '3p, 1k+',
    '四麻特上卓': '4p, 4d1800+',
    '三麻特上卓': '3p, 4d1800+',
    '四麻雀荘戦': '4p, Parlor',
    '三麻雀荘戦': '3p, Parlor',
    '四麻鳳凰卓': '4p, 7d2000+',
    '三麻鳳凰卓': '3p, 7d2000+'
  },
  'romaji': {
    '新人': '新人',
    '９級': '９級',
    '８級': '８級',
    '７級': '７級',
    '６級': '６級',
    '５級': '５級',
    '４級': '４級',
    '３級': '３級',
    '２級': '２級',
    '１級': '１級',
    '初段': '初段',
    '二段': '二段',
    '三段': '三段',
    '四段': '四段',
    '五段': '五段',
    '六段': '六段',
    '七段': '七段',
    '八段': '八段',
    '九段': '九段',
    '十段': '十段',
    '四般東喰赤速': '4, Ippan , Est, Fas',
    '四般東喰赤': '4, Ippan , Est',
    '四般南喰赤速': '4, Ippan , Sth, Fas',
    '四般南喰赤': '4, Ippan , Sth',
    '三般東喰赤速': '3, Ippan , Est, Fas',
    '三般東喰赤': '3, Ippan , Est',
    '三般南喰赤速': '3, Ippan , Sth, Fas',
    '三般南喰赤': '3, Ippan , Sth',
    '四上東喰赤速': '4, Joukyuu, Est, Fas',
    '四上東喰赤': '4, Joukyuu, Est',
    '四上南喰赤速': '4, Joukyuu, Sth, Fas',
    '四上南喰赤': '4, Joukyuu, Sth',
    '三上東喰赤速': '3, Joukyuu, Est, Fas',
    '三上東喰赤': '3, Joukyuu, Est',
    '三上南喰赤速': '3, Joukyuu, Sth, Fas',
    '三上南喰赤': '3, Joukyuu, Sth',
    '四特東喰赤速': '4, Tokujou, Est, Fas',
    '四特東喰赤': '4, Tokujou, Est',
    '四特南喰赤速': '4, Tokujou, Sth, Fas',
    '四特南喰赤': '4, Tokujou, Sth',
    '三特東喰赤速': '3, Tokujou, Est, Fas',
    '三特東喰赤': '3, Tokujou, Est',
    '三特南喰赤速': '3, Tokujou, Sth, Fas',
    '三特南喰赤': '3, Tokujou, Sth',
    '四鳳東喰赤速': '4, Houou, Est, Fas',
    '四鳳東喰赤': '4, Houou, Est',
    '四鳳南喰赤速': '4, Houou, Sth, Fas',
    '四鳳南喰赤': '4, Houou, Sth',
    '三鳳東喰赤速': '3, Houou, Est, Fas',
    '三鳳東喰赤': '3, Houou, Est',
    '三鳳南喰赤速': '3, Houou, Sth, Fas',
    '三鳳南喰赤': '3, Houou, Sth',
    '四麻上級卓': '4 players, Joukyuu',
    '三麻上級卓': '3 players, Joukyuu',
    '四麻特上卓': '4 players, Tokujou',
    '三麻特上卓': '3 players, Tokujou',
    '四麻雀荘戦': '4 players, Jansou',
    '三麻雀荘戦': '3 players, Jansou',
    '四麻鳳凰卓': '4 players, Houou',
    '三麻鳳凰卓': '3 players, Houou',
    '巡目': ' Turn',
    '枚': 'shuugi',
    '速': ' fast'
  }
};

const translationTablePartial_Stats = {
  'EMA': {
    '般南喰赤': '4p, novice, E+S',
    '般東喰赤': '4p, novice, E',
    '上南喰赤': '4p, Dan, E+S',
    '上東喰赤': '4p, Dan, E',
    '特南喰赤': '4p, Upperdan, E+S',
    '特東喰赤': '4p, Upperdan, E',
    '鳳南喰赤': '4p, Phoenix, E+S',
    '鳳東喰赤': '4p, Phoenix, E',
    '一般': 'novice',
    '上級': 'Dan',
    '特上': 'Upperdan',
    '鳳凰': 'Phoenix',
    '三東喰赤': '3p E',
    '三南喰赤': '3p E+S',
    '東喰－': 'E, open all-simples, no red 5s',
    '東－－': 'E, no open all-simples, no red 5s',
    '南喰－': 'E+S, open all-simples, no red 5s',
    '南－－': 'E+S, no open all-simples, no red 5s',
    '三上東喰赤': '3p, E, open all-simples, red 5s',
    '三上南喰赤': '3p, E, open all-simples, red 5s'
  },
  'rad': {
    '全ルールの役満': 'Limit-hands only',
    '般南喰赤': '4p, novice, E+S',
    '般東喰赤': '4p, novice, E',
    '上南喰赤': '4p, 1k+, E+S',
    '上東喰赤': '4p, 1k+, E',
    '特南喰赤': '4p, 4D1800+, E+S',
    '特東喰赤': '4p, 4D1800+, E',
    '鳳南喰赤': '4p, 7D2000+, E+S',
    '鳳東喰赤': '4p, 7D2000+, E',
    '一般': 'novice',
    '上級': '1k+',
    '特上': '4d1800+',
    '鳳凰': '7d2000+'
  },
  'romaji': {
    '全ルールの役満': 'list yakuman only',
    '割合%': '% of wins',
    '和了数': 'No. of winning hands this month:',
    '役統計': 'Statistics of winning hands',
    '東喰赤': 'E-only games',
    '南喰赤': 'E+S games',
    '複合飜': 'Avg.tot.han',
    '%*飜': 'win% x han/yaku',
    '%*複': 'win% x tot.han',
    '※統計情報は毎月リセットされます': 'Statistics are reset monthly',
    'オンライン対戦麻雀 天鳳 / ランキング': 'Tenhou monthly mahjong statistics',
    '役満': 'Recent yakuman hands',
    '対戦数': '# of games',

    '４人打ち全ルール': 'list of top-ranked 4p players',
    '３人打ち全ルール': 'list of top-ranked 3p players',
    '全ルール': ' list of top-ranked players',

    '一般': 'Ippan',
    '上級': 'Tokujou',
    '特上': 'Joukyuu',
    '鳳凰': 'Houou',

    // ranking.html

    '在位数': 'Count',
    '４人打ち': '4p',
    '３人打ち': '3p',
    '平均R': 'Ave.R',

    // sc/?rate*

    'Rateランキング': 'Players with R1800+',
    '段位': 'Rank',
    '名前': 'Player'

  }
};

const translationTableTooltip = {
  EMA: {
    // Game types
    '四般東喰赤速': '4p, novice, East, Open all-simples, Red dora, Fast',
    '四般南喰赤': '4p, novice, East + South, Open all-simples, Red dora',
    '四般南喰赤速': '4p, novice, East + South, Open all-simples, Red dora, Fast',
    '三般東喰赤': '3p, novice, East, Open all-simples, Red dora',
    '三般東喰赤速': '3p, novice, East, Open all-simples, Red dora, Fast',
    '三般南喰赤': '3p, novice, East + South, Open all-simples, Red dora',
    '三般南喰赤速': '3p, novice, East + South, Open all-simples, Red dora, Fast',
    '四上東喰赤': '4p, Dan, East, Open all-simples, Red dora',
    '四上東喰赤速': '4p, Dan+, East, Open all-simples, Red dora, Fast',
    '四上南喰赤': '4p, Dan, East + South, Open all-simples, Red dora',
    '四上南喰赤速': '4p, Dan, East + South, Open all-simples, Red dora, Fast',
    '三上東喰赤': '3p, Dan, East, Open all-simples, Red dora',
    '三上東喰赤速': '3p, Dan, East, Open all-simples, Red dora, Fast',
    '三上南喰赤': '3p, Dan, East + South, Open all-simples, Red dora',
    '三上南喰赤速': '3p, Dan, East + South, Open all-simples, Red dora, Fast',
    '四特東喰赤': '4p, Upperdan, East, Open all-simples, Red dora',
    '四特東喰赤速': '4p, Upperdan, East, Open all-simples, Red dora, Fast',
    '四特南喰赤': '4p, Upperdan, East + South, Open all-simples, Red dora',
    '四特南喰赤速': '4p, Upperdan, East + South, Open all-simples, Red dora, Fast',
    '三特東喰赤': '3p, Upperdan, East, Open all-simples, Red dora',
    '三特東喰赤速': '3p, Upperdan, East, Open all-simples, Red dora, Fast',
    '三特南喰赤': '3p, Upperdan, East + South, Open all-simples, Red dora',
    '三特南喰赤速': '3p, Upperdan, East + South, Open all-simples, Red dora, Fast',
    '四鳳東喰赤': '4p, Phoenix, East, Open all-simples, Red dora',
    '四鳳東喰赤速': '4p, Phoenix, East, Open all-simples, Red dora, Fast',
    '四鳳南喰赤': '4p, Phoenix, East + South, Open all-simples, Red dora',
    '四鳳南喰赤速': '4p, Phoenix, East + South, Open all-simples, Red dora, Fast',
    '三鳳東喰赤': '3p, Phoenix, East, Open all-simples, Red dora',
    '三鳳東喰赤速': '3p, Phoenix, East, Open all-simples, Red dora, Fast',
    '三鳳南喰赤': '3p, Phoenix, East + South, Open all-simples, Red dora',
    '三鳳南喰赤速': '3p, Phoenix, East + South, Open all-simples, Red dora, Fast'
  },
  rad: {
    // by setting a tooltip to null, it overrides lower-priority translations, and prevents a tooltip being created
    '新人': null,
    '９級': null,
    '８級': null,
    '７級': null,
    '６級': null,
    '５級': null,
    '４級': null,
    '３級': null,
    '２級': null,
    '１級': null,
    '初段': null,
    '二段': null,
    '三段': null,
    '四段': null,
    '五段': null,
    '六段': null,
    '七段': null,
    '八段': null,
    '九段': null,
    '十段': null,
    '天鳳位' : null,
    // Game types
    '四般東喰赤速': '4p, novice, East, Open all simples, Red dora, Fast',
    '四般南喰赤': '4p, novice, East + South, Open all simples, Red dora',
    '四般南喰赤速': '4p, novice, East + South, Open all simples, Red dora, Fast',
    '三般東喰赤': '3p, novice, East, Open all simples, Red dora',
    '三般東喰赤速': '3p, novice, East, Open all simples, Red dora, Fast',
    '三般南喰赤': '3p, novice, East + South, Open all simples, Red dora',
    '三般南喰赤速': '3p, novice, East + South, Open all simples, Red dora, Fast',
    '四上東喰赤': '4p, 1k+, East, Open all simples, Red dora',
    '四上東喰赤速': '4p, 1k+, East, Open all simples, Red dora, Fast',
    '四上南喰赤': '4p, 1k+, East + South, Open all simples, Red dora',
    '四上南喰赤速': '4p, 1k+, East + South, Open all simples, Red dora, Fast',
    '三上東喰赤': '3p, 1k+, East, Open all simples, Red dora',
    '三上東喰赤速': '3p, 1k+, East, Open all simples, Red dora, Fast',
    '三上南喰赤': '3p, 1k+, East + South, Open all simples, Red dora',
    '三上南喰赤速': '3p, 1k+, East + South, Open all simples, Red dora, Fast',
    '四特東喰赤': '4p, 4d1800+, East, Open all simples, Red dora',
    '四特東喰赤速': '4p, 4d1800+, East, Open all simples, Red dora, Fast',
    '四特南喰赤': '4p, 4d1800+, East + South, Open all simples, Red dora',
    '四特南喰赤速': '4p, 4d1800+, East + South, Open all simples, Red dora, Fast',
    '三特東喰赤': '3p, 4d1800+, East, Open all simples, Red dora',
    '三特東喰赤速': '3p, 4d1800+, East, Open all simples, Red dora, Fast',
    '三特南喰赤': '3p, 4d1800+, East + South, Open all simples, Red dora',
    '三特南喰赤速': '3p, 4d1800+, East + South, Open all simples, Red dora, Fast',
    '四鳳東喰赤': '4p, 7d2000+, East, Open all simples, Red dora',
    '四鳳東喰赤速': '4p, 7d2000+, East, Open all simples, Red dora, Fast',
    '四鳳南喰赤': '4p, 7d2000+, East + South, Open all simples, Red dora',
    '四鳳南喰赤速': '4p, 7d2000+, East + South, Open all simples, Red dora, Fast',
    '三鳳東喰赤': '3p, 7d2000+, East, Open all simples, Red dora',
    '三鳳東喰赤速': '3p, 7d2000+, East, Open all simples, Red dora, Fast',
    '三鳳南喰赤': '3p, 7d2000+, East + South, Open all simples, Red dora',
    '三鳳南喰赤速': '3p, 7d2000+, East + South, Open all simples, Red dora, Fast'
  },
  'romaji': {
    // Ranks
    '新人': 'rookie',
    '９級': '9kyuu',
    '８級': '8kyuu',
    '７級': '7kyuu',
    '６級': '6kyuu',
    '５級': '5kyuu',
    '４級': '4kyuu',
    '３級': '3kyuu',
    '２級': '2kyuu',
    '１級': '1kyuu',
    '初段': '1dan',
    '二段': '2dan',
    '三段': '3dan',
    '四段': '4dan',
    '五段': '5dan',
    '六段': '6dan',
    '七段': '7dan',
    '八段': '8dan',
    '九段': '9dan',
    '十段': '10dan',
    '天鳳位' : 'tenhoui',
    // Game types
    '四般東喰赤速': '4 players, Ippan, East round, Open tanyao, Red dora, Fast',
    '四般南喰赤': '4 players, Ippan, East + South round, Open tanyao, Red dora',
    '四般南喰赤速': '4 players, Ippan, East + South round, Open tanyao, Red dora, Fast',
    '三般東喰赤': '3 players, Ippan, East round, Open tanyao, Red dora',
    '三般東喰赤速': '3 players, Ippan, East round, Open tanyao, Red dora, Fast',
    '三般南喰赤': '3 players, Ippan, East + South round, Open tanyao, Red dora',
    '三般南喰赤速': '3 players, Ippan, East + South round, Open tanyao, Red dora, Fast',
    '四上東喰赤': '4 players, Joukyuu, East round, Open tanyao, Red dora',
    '四上東喰赤速': '4 players, Joukyuu, East round, Open tanyao, Red dora, Fast',
    '四上南喰赤': '4 players, Joukyuu, East + South round, Open tanyao, Red dora',
    '四上南喰赤速': '4 players, Joukyuu, East + South round, Open tanyao, Red dora, Fast',
    '三上東喰赤': '3 players, Joukyuu, East round, Open tanyao, Red dora',
    '三上東喰赤速': '3 players, Joukyuu, East round, Open tanyao, Red dora, Fast',
    '三上南喰赤': '3 players, Joukyuu, East + South round, Open tanyao, Red dora',
    '三上南喰赤速': '3 players, Joukyuu, East + South round, Open tanyao, Red dora, Fast',
    '四特東喰赤': '4 players, Tokujou, East round, Open tanyao, Red dora',
    '四特東喰赤速': '4 players, Tokujou, East round, Open tanyao, Red dora, Fast',
    '四特南喰赤': '4 players, Tokujou, East + South round, Open tanyao, Red dora',
    '四特南喰赤速': '4 players, Tokujou, East + South round, Open tanyao, Red dora, Fast',
    '三特東喰赤': '3 players, Tokujou, East round, Open tanyao, Red dora',
    '三特東喰赤速': '3 players, Tokujou, East round, Open tanyao, Red dora, Fast',
    '三特南喰赤': '3 players, Tokujou, East + South round, Open tanyao, Red dora',
    '三特南喰赤速': '3 players, Tokujou, East + South round, Open tanyao, Red dora, Fast',
    '四鳳東喰赤': '4 players, Houou, East round, Open tanyao, Red dora',
    '四鳳東喰赤速': '4 players, Houou, East round, Open tanyao, Red dora, Fast',
    '四鳳南喰赤': '4 players, Houou, East + South round, Open tanyao, Red dora',
    '四鳳南喰赤速': '4 players, Houou, East + South round, Open tanyao, Red dora, Fast',
    '三鳳東喰赤': '3 players, Houou, East round, Open tanyao, Red dora',
    '三鳳東喰赤速': '3 players, Houou, East round, Open tanyao, Red dora, Fast',
    '三鳳南喰赤': '3 players, Houou, East + South round, Open tanyao, Red dora',
    '三鳳南喰赤速': '3 players, Houou, East + South round, Open tanyao, Red dora, Fast'
  }
};

let partialPhrases;
let mutationObserver;
let last_translation_seen='';
let thisPartialTable={};
let thisExactTable={};
let thisTooltipTable={};

const partialMatch = function(originalText) {
    "use strict";
    let needle;
    for (needle of partialPhrases) { // JSLint doesn't like it, but that's ok
        if (originalText.includes(needle)) {
            // Exits as soon as a match is found. Saves time,
            // but requires thoughtful sorting of thisPartialTable
            // to ensure that no element in it is a substring of a later element
            return needle;
        }
    }
    return false;
};

const observerSettings = {
    childList: true,
    subtree: true
};

function get_translations(callback) {
    "use strict";
    chrome.storage.local.get({translation: 'off'}, function(storedval) {
        if (
            (storedval.translation === last_translation_seen && thisExactTable)
            || storedval.translation === 'off')
           {
            // we've already got the right translation, so can go translate immediately
            callback.call();
            return;
        }

        last_translation_seen = storedval.translation;
        let translation = storedval.translation.split(',');
        chrome.storage.local.get({tables: null}, function(storedval) {

            let thisStatsTable;

            if (storedval.tables) {

                thisExactTable   = storedval.tables.exact;
                thisPartialTable = storedval.tables.partial;
                thisStatsTable   = storedval.tables.stats;
                thisTooltipTable = storedval.tables.tooltip;

            } else {

                const overlay = function(table_in) {
                    let table_out = table_in[translation[0]];
                    let i;
                    for  (i = 1; i < translation.length; i += 1) {
                        Object.assign(table_out, table_in[translation[i]]); // ECMA6 way of merging objects
                    }
                    return table_out;
                };

                thisExactTable   = overlay(translationTableExact);
                thisPartialTable = overlay(translationTablePartial);
                thisStatsTable   = overlay(translationTablePartial_Stats);
                thisTooltipTable = overlay(translationTableTooltip);

                // the cascaded translations are stored in local storage
                // (not sync, as the translations are too large for sync)
                // so that the cascading is only done
                // when the translation type is changed by the user on the options screen,
                // or when the extension is updated

                chrome.storage.local.set({tables: {
                    exact:   thisExactTable,
                    partial: thisPartialTable,
                    stats:   thisStatsTable,
                    tooltip: thisTooltipTable
                }});

            }

            if(window.location.href.indexOf("/3") === -1) {
                Object.assign(thisPartialTable, thisStatsTable);
            }

            partialPhrases = Object.keys(thisPartialTable);

            callback.call();
        });
    });
}

const onMutate = function() {
    "use strict";

    mutationObserver.disconnect();

    const elements = document.getElementsByTagName('*');

    let i;
    for (i = 0; i < elements.length; i += 1) {
        let j;
        if (elements[i].tagName.toLowerCase() === 'button') {
            elements[i].style.overflow = 'hidden';
        }
        for (j = 0; j < elements[i].childNodes.length; j += 1) {

            let node = elements[i].childNodes[j];
            if (node.nodeType === 3) {
                let originalText = node.nodeValue;
                if (thisExactTable[originalText]) {
                    elements[i].replaceChild(document.createTextNode(thisExactTable[originalText]), node);
                } else {
                    let partialMatchKey = partialMatch(originalText);
                    if (partialMatchKey) {
                        let newText = originalText.replace(partialMatchKey, thisPartialTable[partialMatchKey]);
                        elements[i].replaceChild(document.createTextNode(newText), node);
                        if (thisTooltipTable[partialMatchKey]) {
                            elements[i].setAttribute('title', thisTooltipTable[partialMatchKey]);
                            if (elements[i].tagName.toLowerCase() === 'span') {
                                elements[i].parentElement.style.overflow = 'hidden';
                            } else {
                                elements[i].style.overflow = 'hidden';
                            }
                        }
                    }
                }
            }
        }
    }
    mutationObserver.observe(document.documentElement, observerSettings);
};

get_translations(function(){
    "use strict";
    let tbox = document.createElement('div');

    tbox.setAttribute('id', 'translationfloater');
    tbox.addEventListener('click', function () {
        chrome.runtime.sendMessage({'show':'options'});
    });
    document.body.appendChild(tbox);

    mutationObserver = new MutationObserver(function() {get_translations(onMutate);});
    mutationObserver.observe(document.documentElement, observerSettings);

    if (window.location.href.indexOf("/3") === -1) {
        // force the statistics pages to translate when first ready
        onMutate();
    }
});