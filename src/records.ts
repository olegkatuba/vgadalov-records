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
                description: "Мама: то песня, когда ему исполнилось три года, его первый раз тётка привела на юбилей к себе в ресторан. У нас был такой семейный ужин, произвела на него огромное впечатление Юрия Шатунова, эта песня, и он потом её очень долго пел, танцевал на всех семейных мероприятиях. Можно сказать, что такая знаковая песня, и длительное время он её пел, вспоминал. Наверное, из таких вот сознательных мелодий я вспоминаю этот вариант.",
                "path": "./tracks/Laskovyj_Maj_-_Detstvo.mp3"
            },
            {
                "name": "Море, море",
                "author": "Юрий Антонов",
                description: "Мама:Когда ему было пять лет, мы первый раз поехали отдыхать на море в Алушту. Первый раз он увидел как само море, горы, солнце. Такое было тоже, наверное, самое насыщенное яркие впечатления. Такие первые, связанные с морем, и он эту песню пел «Море-море, мир бездонный». Но он её пел не «мир бездонный», а её пел «море-море, мир бездомных», не совсем врубая смысл, но тоже такое яркое событие, и я уверена, все эти два варианта песни он помнит очень хорошо, и события эти в жизни тоже. К сожалению, видео нет, скину фоток с моря именно в этом возрасте, но как-то так.",
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
                description: "Вова:Каждый раз когда я их слышу я вспоминаю детские анимации в Египте и всегда со мной рядом был Владик, который вспыхивал как спичка от этой музыки и с детской наивной улыбкой начинал отплясывать. Мой Владик!",
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
                description: "Макс: Песня которую мы слушали в летнем лагере когда познакомились в 2012 году",
                "path": "./tracks/Макс Корж - Небо Поможет Нам.mp3"
            },
            {
                "name": "Разнесем",
                "author": "Макс Корж",
                description: "Макс: Очень крутое воспоминание с концерта",
                "path": "./tracks/Макс Корж  - Разнесем.mp3"
            },
            {
                "name": "Тает дым",
                "author": "Макс Корж",
                description: "Юля: тоже воспоминание с концерта)",
                "path": "./tracks/Макс Корж - Тает Дым.mp3"
            },
            {
                "name": "Два типа людей",
                "author": "Макс Корж",
                description: "Антон: Влад очень любил её слушать на офисе, поэтому каждый раз, когда она играет, вспоминаю Влада 😁",
                "path": "./tracks/Maks_Korzh_-_2_tipa_lyudej.mp3"
            },
            {
                "name": "Где нас нет",
                "author": "Oxxxymiron",
                description: "Никита: мы пьяные на пару орали стоя на столе",
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
                description: "Антон: Ещё есть Eminem - Till I Collapse. Это песня, которую долгое время Влад хотел со мной спеть дуэтом, считая, что должно получиться офигенно :)",
                "path": "./tracks/Eminem_ft._50_Cent_-_Till_I_Collapse.mp3"
            },
            {
                "name": "С самых высоких скал",
                "author": "Сироткин",
                description: "Про свободу ",
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
                description: "Настя: песня, которая стояла/стоит на звонке белорусского номера, сразу понимаешь, кому звонишь😅 \n\nМакс: Это уже как мем. 2 года у него на звонке стояла.",
                "path": "./tracks/Mihail_SHufutinskij_-_3_sentyabrya.mp3"
            },
            {
                "name": "Viva Kalman",
                "author": "Агата Кристи",
                description: "Мама:  самая бесячая песня для Влада,  потому что у меня муж был помешан на этой песне, она у нас всё время крутилась, и так вот от любви до ненависти, как говорится. На выходе он тоже стал слушать и, в принципе, подпевать",
                "path": "./tracks/Agata_Kristi_-_Viva_Kalman.mp3"
            },
            {
                "name": "Non, je ne regrette rien",
                "author": "Édith Piaf",
                description: "Артем: в офисе влад постоянно слушал \"ооооооооо рьедорьяяяяяян\"",
                "path": "./tracks/dith_Piaf_-_Non_je_ne_regrette_rien.mp3"
            },
            {
                "name": "Как молоды мы были",
                "author": "Александр Градский",
                description: "Настя : Я дико бешусь, когда она играет из-за диапазона Градского, и прошу переключить, а Влад всегда стебётся. Недавно он отрекся от массажа на 2 дня, лишь бы спеть второй куплет при мне и не переключать.",
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
                description: "Юля: Влад тоже маленькая лошадка :))) ",
                "path": "./tracks/najjk-borzov-loshadka.mp3"
            },
            {
                "name": "What Is Love",
                "author": "Haddaway",
                description: "Антон: Есть песня What Is Love, начиная с универа когда включалась эта песня, все оборачивались на Влада по понятной причине 😁 Поэтому тоже теперь ассоциируется с Владиком",
                "path": "./tracks/Haddaway - What Is Love.mp3"
            },
            {
                "name": "One Night in Bangkok",
                "author": "Murray Head",
                description: "Линар : Это невероятно эпичный и слегка ретро-кринжовый трек про шахматный турнир. Он идеально описывает те моменты, когда вы планируете стратегию развития компании, словно разыгрываете сложную партию, где ставки высоки, а вокруг происходит безумие. \nГроссмейстер горящей задницы делает ход конем.",
                "path": "./tracks/Murray Head - One Night In Bangcock.mp3"
            },
            {
                "name": "Play God",
                "author": "Sam Fender",
                description: "Никита: эту песню Влад много слушал на офисе",
                "path": "./tracks/Sam_Fender_-_Play_God_(SkySound.cc).mp3"
            },
            {
                "name": "Вечно молодой",
                "author": "Роман Бестселлер, Сергей Бобунец",
                description: "Настя: у Владика уже есть заскок быть всегда молодым и хорошо выглядеть, поэтому вот",
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
                "path": "./tracks/Sting_-_Roza_pustyni.mp3"
            },
            {
                "name": "Stand by me",
                "author": "Till Bronner, Gregory Porter",
                "path": "./tracks/Till Bronner - Stand By Me (Feat. Gregory Porter).mp3"
            },
            {
                "name": "Una Mattina",
                "author": "Ludovico Einaudi",
                description: "Настя: Любимый фильм 1+1, саундтрэк оттуда",
                "path": "./tracks/Ludovico_Einaudi_-_Una_mattina_(SkySound.cc).mp3"
            },
            {
                "name": "Air on a G String",
                "author": "Johann Sebastian Bach, HAUSER",
                description: "Линар: Строгий, размеренный бас и парящая, свободная мелодия, построенная на простой математической последовательности. А еще я выбрал ее, потому что серьезные взрослые люди не могут пройти мимо английского названия, не хихикнув как школьники.",
                "path": "./tracks/Johann_Sebastian_Bach_-_Air_on_the_G_String_(SkySound.cc).mp3"
            },
            {
                "name": "Goldberg Variations, BWV 988",
                "author": "Johann Sebastian Bach, Glenn Gould",
                description: "Линар: Легенда гласит, что Бах написал этот шедевр по заказу графа, который страдал бессонницей. Музыкальная структура здесь — чистый код и фракталы. Это гимн для тех ночей, когда не можешь уснуть из-за мыслей.",
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