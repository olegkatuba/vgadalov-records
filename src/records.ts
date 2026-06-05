import type { RecordInfo } from "./Player";

const recordOne: RecordInfo = {
    "sideOne": {
        image: './SIDE A.png',
        "tracks": [
            {
                "name": "All Star",
                "author": "Smash Mouth",
                "path": "./tracks/Smash Mouth - All Star.mp3",
            },
            {
                "name": "Baby One More Time",
                "author": "Britney Spears",
                "path": "./tracks/Britney Spears - Baby One More Time.mp3"
            },
            {
                "name": "I Want It That Way",
                "author": "Backstreet Boys",
                "path": "./tracks/Backstreet Boys - I Want It That Way.mp3"
            },
            {
                "name": "Livin’ la Vida Loca",
                "author": "Ricky Martin",
                path: "./tracks/Ricky Martin - Living La Vida Loca.mp3"
            },
            {
                "name": "Mambo No.5",
                "author": "Lou Bega",
                path: "./tracks/Lou Bega - Mambo No 5.mp3"
            },
            {
                "name": "Blue (Da Ba Dee)",
                "author": "Eiffel 65",
                "path": "./tracks/Eiffel 65 - Blue.mp3"
            },
            {
                "name": "Believe",
                "author": "Cher",
                "path": "./tracks/Cher - Believe.mp3"
            }
        ],
    },
    "sideTwo": {
        image: './SIDE B.png',
        "tracks": [
            {
                "name": "Детство",
                "author": "Ласковый Май",
                description: "Когда тебе исполнилось три года, ты был у тёти на юбилее в ресторане на семейном ужине. Тогда на тебя огромное впечатление произвела эта песня, которую ты очень долго пел, а после танцевал под неё на всех семейных мероприятиях. Можно сказать, что это твой первый трек на репите :)) ",
                "path": "./tracks/Laskovyj_Maj_-_Detstvo.mp3"
            },
            {
                "name": "Море, море",
                "author": "Юрий Антонов",
                description: "Когда тебе было пять лет, ты с родителями поехал отдыхать на море в Алушту. Тогда ты впервые увидел море и горы. Это было, наверное, самое насыщенное и яркое впечатление того времени. И в то время ты любил петь эту песню, но вместо  «Море, море, мир бездонный», ты пел  «Море, море, мир бездомных»",
                "path": "./tracks/YUrij_Antonov_-_More.mp3"
            },
            {
                "name": "Звездное лето",
                "author": "Алла Пугачева",
                "path": "./tracks/Алла Пугачева - Звездное Лето.mp3"
            },
            {
                "name": "Арлекино",
                "author": "Алла Пугачева",
                "path": "./tracks/Алла Пугачева - Арлекино.mp3"
            },
            {
                "name": "Aram-Zam-Zam",
                "author": "Fabio Cobelli",
                description: "А это воспоминание о тебе от Вовы, потому что как только он слышит детские анимации, то всегда представляет тебя, потому что ты вспыхивал как спичка от детских песен и с наивной улыбкой начинал отплясывать",
                "path": "./tracks/Fabio_Cobelli_-_Aram-Zam-Zam.mp3"
            },
        ]
    }
};

const recordTwo: RecordInfo = {
    "sideOne": {
        image: './SIDE C.png',
        "tracks": [
            {
                "name": "Небо поможет нам",
                "author": "Макс Корж",
                description: "Под эту песню вы познакомились с Максом в летнем лагере в 2012 году",
                "path": "./tracks/Макс Корж - Небо Поможет Нам.mp3"
            },
            {
                "name": "Разнесем",
                "author": "Макс Корж",
                description: "Слушая эту песню, Макс вспоминает о том, как вы провели время на концерте Макса Коржа",
                "path": "./tracks/Макс Корж  - Разнесем.mp3"
            },
            {
                "name": "Тает дым",
                "author": "Макс Корж",
                description: "А под эту песню уже Юля вспоминает о том, как вы побывали на этом же концерте",
                "path": "./tracks/Макс Корж - Тает Дым.mp3"
            },
            {
                "name": "Два типа людей",
                "author": "Макс Корж",
                description: "Песня заслушанная до дыр в офисе, поэтому теперь это песня-воспоминание для Антона",
                "path": "./tracks/Maks_Korzh_-_2_tipa_lyudej.mp3"
            },
            {
                "name": "Где нас нет",
                "author": "Oxxxymiron",
                description: "Вы с Никитой пьяные на пару орали эту песню многократно, в том числе стоя на столе",
                "path": "./tracks/Oxxxymiron - Где Нас Нет.mp3"
            },
            {
                "name": "Город под подошвами",
                "author": "Oxxxymiron",
                "path": "./tracks/Oxxxymiron-Город–Под_Подошвой.mp3"
            },
            {
                "name": "Till i collapse",
                "author": "Eminem",
                description: "Когда-то ты хотел с Антоном спеть эту песню дуэтом, но что-то пошло не так :)",
                "path": "./tracks/Eminem_ft._50_Cent_-_Till_I_Collapse.mp3"
            },
            {
                "name": "С самых высоких скал",
                "author": "Сироткин",
                description: "Этот трек от Насти и посвящен свободе",
                "path": "./tracks/Sirotkin_-_S_samyh_vysokih_skal.mp3"
            },
        ],
    },
    "sideTwo": {
        image: './SIDE D.png',
        "tracks": [
            {
                "name": "3-е сентября",
                "author": "Михаил Шуфутинский",
                description: "Это не только мелодия для звонка твоего телефона, но и мем, который плотно связан с тобой у большинства твоих близких :))",
                "path": "./tracks/Mihail_SHufutinskij_-_3_sentyabrya.mp3"
            },
            {
                "name": "Viva Kalman",
                "author": "Агата Кристи",
                description: "Мама тебя очень любит, поэтому добавила в этот список самую бесящую тебя песню, хоть и любимую для твоего папы, но мы знаем, что ты прошел путь от ненависти до любви и даже подпеваешь, когда она звучит",
                "path": "./tracks/Agata_Kristi_-_Viva_Kalman.mp3"
            },
            {
                "name": "Non, je ne regrette rien",
                "author": "Édith Piaf",
                description: "Ооооооооо рьедорьяяяяяян..... Это песня-ассоциация от Артема, потому что она тоже часто звучала на офисе",
                "path": "./tracks/dith_Piaf_-_Non_je_ne_regrette_rien.mp3"
            },
            {
                "name": "Как молоды мы были",
                "author": "Александр Градский",
                description: "Ты отрекся от массажа на 2 дня, лишь бы побесить Настю и спеть эту песню. У тебя есть возможность побесить её безвозмездно :) Владик, на бис!! ",
                "path": "./tracks/Aleksandr_Gradskij_-_Kak_molody_my_byli_1976_.mp3"
            },
        ]
    }
};

const recordThree: RecordInfo = {
    "sideOne": {
        image: './SIDE E.png',
        "tracks": [
            {
                "name": "Лошадка",
                "author": "Найк Борзов",
                description: "Ты тоже маленькая лошадка, и это песня-ассоциация от Юли :))) ",
                "path": "./tracks/najjk-borzov-loshadka.mp3"
            },
            {
                "name": "What Is Love",
                "author": "Haddaway",
                description: "Начиная с универа, как только включалась эта песня, все оборачивались на тебя, потому что \"What is love\" очень созвучно с \"Владислав\", и это песня-ассоциация от Антона",
                "path": "./tracks/Haddaway - What Is Love.mp3"
            },
            {
                "name": "One Night in Bangkok",
                "author": "Murray Head",
                description: "Песня-ассоциация от Линара, потому что это невероятно эпичный и слегка ретро-кринжовый трек про шахматный турнир. Он идеально описывает те моменты, когда вы планируете стратегию развития компании, словно разыгрываете сложную партию, где ставки высоки, а вокруг происходит безумие. \"Гроссмейстер горящей задницы делает ход конем\" (с) Линар",
                "path": "./tracks/Murray Head - One Night In Bangcock.mp3"
            },
            {
                "name": "Play God",
                "author": "Sam Fender",
                description: "Песня-ассоциация от Никиты, потому что ты тоже заслушивал эту песню до дыр в офисе",
                "path": "./tracks/Sam_Fender_-_Play_God_(SkySound.cc).mp3"
            },
            {
                "name": "Вечно молодой",
                "author": "Роман Бестселлер, Сергей Бобунец",
                description: "Посвящается твоим попыткам остаться молодым, но прости, четвертый десяток твоей жизни уже дышит тебе в спину :)) ",
                "path": "./tracks/Roman_Bestseller_Sergej_Bobunec_-_Vechno_molodoj.mp3"
            },
            {
                "name": "Cosmotango",
                "author": "iday",
                "path": "./tracks/iday_-_Cosmotango.mp3"
            },
        ],
    },
    "sideTwo": {
        image: './SIDE F.png',
        "tracks": [
            {
                "name": "Englishman In New York",
                "author": "Sting",
                "path": "./tracks/Sting_-_Englishman_In_New_York.mp3"
            },
            {
                "name": "Fields of Gold",
                "author": "Sting",
                "path": "./tracks/Sting - Fields Of Gold.mp3"
            },
            {
                "name": "Desert Rose",
                "author": "Sting",
                "path": "./tracks/Sting_Sheb_Mami_-_Roza_v_pustyne_Desert_rose.mp3"
            },
            {
                "name": "Stand by me",
                "author": "Till Bronner, Gregory Porter",
                "path": "./tracks/Till Bronner - Stand By Me (Feat. Gregory Porter).mp3"
            },
            {
                "name": "Una Mattina",
                "author": "Ludovico Einaudi",
                "path": "./tracks/Ludovico_Einaudi_-_Una_mattina_(SkySound.cc).mp3"
            },
            {
                "name": "Air on a G String",
                "author": "Johann Sebastian Bach, HAUSER",
                description: "Песня от Линара. Строгий, размеренный бас и парящая, свободная мелодия, построенная на простой математической последовательности. А еще он выбрал ее, потому что серьезные взрослые люди не могут пройти мимо английского названия, не хихикнув как школьники",
                "path": "./tracks/Johann_Sebastian_Bach_-_Air_on_the_G_String_(SkySound.cc).mp3"
            },
            {
                "name": "Goldberg Variations, BWV 988",
                "author": "Johann Sebastian Bach, Glenn Gould",
                description: "Песня от Линара. Легенда гласит, что Бах написал этот шедевр по заказу графа, который страдал бессонницей. Музыкальная структура здесь — чистый код и фракталы. Это гимн для тех ночей, когда не можешь уснуть из-за мыслей",
                "path": "./tracks/Glenn_Gould_-_Goldberg_Variations_BWV_988_Aria_(SkySound.cc).mp3"
            },
        ]
    }
};

export const RECORDS = [
    recordOne,
    recordTwo,
    recordThree,
];