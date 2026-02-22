
import { Level } from './types';

export type LevelCategory = 'repaso' | 'facil' | 'intermedio' | 'dificil';

export interface StaticLevel extends Level {
  category: LevelCategory;
  hints: Record<'ca' | 'es', string[]>;
  feedback: Record<'ca' | 'es', {
    wrong: string;
  }>;
}

export const MATH_LEVELS: StaticLevel[] = [
  { 
    id: 1, 
    category: 'repaso',
    title: { ca: "Problema 1", es: "Problema 1" }, 
    equation: { ca: "x + 8 = 15", es: "x + 8 = 15" }, 
    expectedAnswer: "7",
    hints: {
      ca: ["L'objectiu és deixar la x sola.", "Si el 8 està sumant, com passa a l'altre costat?", "Prova a restar 8 a 15."],
      es: ["El objetivo es dejar la x sola.", "Si el 8 está sumando, ¿cómo pasa al otro lado?", "Prueba a restar 8 a 15."]
    },
    feedback: {
      ca: { wrong: "Revisa la suma. Si tens 15 i treus 8, quant queda?" },
      es: { wrong: "Revisa la suma. Si tienes 15 y quitas 8, ¿cuánto queda?" }
    }
  },
  { 
    id: 2, 
    category: 'repaso',
    title: { ca: "Problema 2", es: "Problema 2" }, 
    equation: { ca: "4x = 24", es: "4x = 24" }, 
    expectedAnswer: "6",
    hints: {
      ca: ["El 4 està multiplicant a la x.", "L'operació contrària a multiplicar és dividir.", "Divideix 24 entre 4."],
      es: ["El 4 está multiplicando a la x.", "La operación contraria a multiplicar es dividir.", "Divide 24 entre 4."]
    },
    feedback: {
      ca: { wrong: "Busca un número que multiplicat per 4 doni 24." },
      es: { wrong: "Busca un número que multiplicado por 4 dé 24." }
    }
  },
  { 
    id: 3, 
    category: 'repaso',
    title: { ca: "Problema 3", es: "Problema 3" }, 
    equation: { ca: "3x - 5 = 10", es: "3x - 5 = 10" }, 
    expectedAnswer: "5",
    hints: {
      ca: ["Primer 'neteja' el voltant de la x. Passa el -5 a l'altre costat.", "Si el 5 resta, passa sumant: 3x = 10 + 5.", "Ara divideix el resultat per 3."],
      es: ["Primero 'limpia' lo que rodea a la x. Pasa el -5 al otro lado.", "Si el 5 resta, pasa sumando: 3x = 10 + 5.", "Ahora divide el resultado por 3."]
    },
    feedback: {
      ca: { wrong: "Recorda: primer passa el número que no té x, i després el que multiplica." },
      es: { wrong: "Recuerda: primero pasa el número que no tiene x, y después el que multiplica." }
    }
  },
  {
    id: 4,
    category: 'repaso',
    title: { ca: "Problema 4", es: "Problema 4" },
    equation: { ca: "x - 6 = 11", es: "x - 6 = 11" },
    expectedAnswer: "17",
    hints: {
      ca: ["L'objectiu és deixar la x sola.", "Si el 6 resta, passa sumant a l'altre costat.", "Suma 6 a ambdós costats: x = 11 + 6."],
      es: ["El objetivo es dejar la x sola.", "Si el 6 resta, pasa sumando al otro lado.", "Suma 6 a ambos lados: x = 11 + 6."]
    },
    feedback: {
      ca: { wrong: "Si treus 6 d'un número i obtens 11, quin era el número original?" },
      es: { wrong: "Si quitas 6 a un número y obtienes 11, ¿cuál era el número original?" }
    }
  },
  {
    id: 5,
    category: 'repaso',
    title: { ca: "Problema 5", es: "Problema 5" },
    equation: { ca: "x/5 = 4", es: "x/5 = 4" },
    expectedAnswer: "20",
    hints: {
      ca: ["La x està dividida per 5.", "L'operació contrària a dividir és multiplicar.", "Multiplica els dos costats per 5."],
      es: ["La x está dividida por 5.", "La operación contraria a dividir es multiplicar.", "Multiplica ambos lados por 5."]
    },
    feedback: {
      ca: { wrong: "Quin número dividit per 5 dóna 4?" },
      es: { wrong: "¿Qué número dividido entre 5 da 4?" }
    }
  },
  {
    id: 6,
    category: 'repaso',
    title: { ca: "Problema 6", es: "Problema 6" },
    equation: { ca: "2x + 1 = 9", es: "2x + 1 = 9" },
    expectedAnswer: "4",
    hints: {
      ca: ["Primer elimina el +1 de l'esquerra passant-lo a la dreta restant.", "Et queda 2x = 8.", "Ara divideix els dos costats per 2."],
      es: ["Primero elimina el +1 de la izquierda pasándolo a la derecha restando.", "Te queda 2x = 8.", "Ahora divide ambos lados entre 2."]
    },
    feedback: {
      ca: { wrong: "Recorda: primer el +1, després el 2 que multiplica." },
      es: { wrong: "Recuerda: primero el +1, después el 2 que multiplica." }
    }
  },
  { 
    id: 7, 
    category: 'facil',
    title: { ca: "Problema 7", es: "Problema 7" }, 
    equation: { ca: "7x + 3 = 4x + 15", es: "7x + 3 = 4x + 15" }, 
    expectedAnswer: "4",
    hints: {
      ca: ["Agrupa totes les x a l'esquerra.", "Passa el 4x a l'esquerra restant: 7x - 4x.", "Passa el 3 a la dreta restant: 15 - 3."],
      es: ["Agrupa todas las x a la izquierda.", "Pasa el 4x a la izquierda restando: 7x - 4x.", "Pasa el 3 a la derecha restando: 15 - 3."]
    },
    feedback: {
      ca: { wrong: "T'hauria de quedar 3x = 12. Quant val x?" },
      es: { wrong: "Te debería quedar 3x = 12. ¿Cuánto vale x?" }
    }
  },
  { 
    id: 8, 
    category: 'facil',
    title: { ca: "Problema 8", es: "Problema 8" }, 
    equation: { ca: "3(x + 2) = 18", es: "3(x + 2) = 18" }, 
    expectedAnswer: "4",
    hints: {
      ca: ["Primer elimina el parèntesi multiplicant el 3 per tot el que hi ha dins.", "3 multiplicat per x i 3 multiplicat per 2.", "L'equació queda: 3x + 6 = 18."],
      es: ["Primero elimina el paréntesis multiplicando el 3 por todo lo de dentro.", "3 multiplicado por x y 3 multiplicado por 2.", "La ecuación queda: 3x + 6 = 18."]
    },
    feedback: {
      ca: { wrong: "Has multiplicat el 3 pel 2? Revisa 3x + 6 = 18." },
      es: { wrong: "¿Has multiplicado el 3 por el 2? Revisa 3x + 6 = 18." }
    }
  },
  { 
    id: 9, 
    category: 'facil',
    title: { ca: "Problema 9", es: "Problema 9" }, 
    equation: { ca: "2(x - 4) = 4(x - 6)", es: "2(x - 4) = 4(x - 6)" }, 
    expectedAnswer: "8",
    hints: {
      ca: ["Multiplica els números de fora pels de dins a cada costat.", "Quedaria: 2x - 8 = 4x - 24.", "Ara agrupa les x i els números."],
      es: ["Multiplica los números de fuera por los de dentro en cada lado.", "Quedaría: 2x - 8 = 4x - 24.", "Ahora agrupa las x y los números."]
    },
    feedback: {
      ca: { wrong: "Compte amb els signes negatius al multiplicar." },
      es: { wrong: "Cuidado con los signos negativos al multiplicar." }
    }
  },
  { 
    id: 10, 
    category: 'facil',
    title: { ca: "Problema 10", es: "Problema 10" }, 
    equation: { ca: "x/4 + 3 = 8", es: "x/4 + 3 = 8" }, 
    expectedAnswer: "20",
    hints: {
      ca: ["Primer passa el +3 a l'altre costat restant.", "Et queda x/4 = 5.", "El 4 que divideix passa a l'altre costat multiplicant."],
      es: ["Primero pasa el +3 al otro lado restando.", "Te queda x/4 = 5.", "El 4 que divide pasa al otro lado multiplicando."]
    },
    feedback: {
      ca: { wrong: "Si x dividit per 4 és 5... quin número és x?" },
      es: { wrong: "Si x dividido por 4 es 5... ¿qué número es x?" }
    }
  },
  {
    id: 11,
    category: 'facil',
    title: { ca: "Problema 11", es: "Problema 11" },
    equation: { ca: "6x - 4 = 2x + 20", es: "6x - 4 = 2x + 20" },
    expectedAnswer: "6",
    hints: {
      ca: ["Agrupa totes les x a l'esquerra: 6x - 2x.", "Agrupa els números a la dreta: 20 + 4.", "Et queda 4x = 24."],
      es: ["Agrupa todas las x a la izquierda: 6x - 2x.", "Agrupa los números a la derecha: 20 + 4.", "Te queda 4x = 24."]
    },
    feedback: {
      ca: { wrong: "Has passat el 2x a l'esquerra i el 4 a la dreta? T'hauria de quedar 4x = 24." },
      es: { wrong: "¿Has pasado el 2x a la izquierda y el 4 a la derecha? Te debería quedar 4x = 24." }
    }
  },
  {
    id: 12,
    category: 'facil',
    title: { ca: "Problema 12", es: "Problema 12" },
    equation: { ca: "5(x - 3) = 20", es: "5(x - 3) = 20" },
    expectedAnswer: "7",
    hints: {
      ca: ["Multiplica el 5 per tot el que hi ha dins del parèntesi.", "Et queda 5x - 15 = 20.", "Passa el 15 a la dreta i divideix per 5."],
      es: ["Multiplica el 5 por todo lo que hay dentro del paréntesis.", "Te queda 5x - 15 = 20.", "Pasa el 15 a la derecha y divide entre 5."]
    },
    feedback: {
      ca: { wrong: "Has multiplicat 5 per -3 també? Et queda 5x - 15 = 20." },
      es: { wrong: "¿Has multiplicado 5 por -3 también? Te queda 5x - 15 = 20." }
    }
  },
  { 
    id: 13, 
    category: 'intermedio',
    title: { ca: "Problema 13", es: "Problema 13" }, 
    equation: { ca: "x/2 + x/3 = 10", es: "x/2 + x/3 = 10" }, 
    expectedAnswer: "12",
    hints: {
      ca: ["Necessites el mínim comú múltiple de 2 i 3, que és 6.", "Multiplica tota l'equació per 6 per treure denominadors.", "Quedaria: 3x + 2x = 60."],
      es: ["Necesitas el mínimo común múltiplo de 2 y 3, que es 6.", "Multiplica toda la ecuación por 6 para quitar denominadores.", "Quedaría: 3x + 2x = 60."]
    },
    feedback: {
      ca: { wrong: "Has multiplicat el 10 també pel m.c.m. (6)?" },
      es: { wrong: "¿Has multiplicado el 10 también por el m.c.m. (6)?" }
    }
  },
  { 
    id: 14, 
    category: 'intermedio',
    title: { ca: "Problema 14", es: "Problema 14" }, 
    equation: { ca: "El triple d'un número menys 7 és igual a 20. Quin és el número?", es: "El triple de un número menos 7 es igual a 20. ¿Cuál es el número?" }, 
    expectedAnswer: "9",
    hints: {
      ca: ["Escriu l'equació: 'El triple d'un número' és 3x.", "'Menys 7' és - 7.", "L'equació és 3x - 7 = 20."],
      es: ["Escribe la ecuación: 'El triple de un número' es 3x.", "'Menos 7' es - 7.", "La ecuación es 3x - 7 = 20."]
    },
    feedback: {
      ca: { wrong: "Planteja l'equació: 3x - 7 = 20." },
      es: { wrong: "Plantea la ecuación: 3x - 7 = 20." }
    }
  },
  { 
    id: 15, 
    category: 'intermedio',
    title: { ca: "Problema 15", es: "Problema 15" }, 
    equation: { ca: "2(x/3 + 1) = x - 4", es: "2(x/3 + 1) = x - 4" }, 
    expectedAnswer: "18",
    hints: {
      ca: ["Primer multiplica el 2 pel parèntesi: 2x/3 + 2 = x - 4.", "Ara multiplica tota l'equació per 3 per treure el denominador.", "Queda: 2x + 6 = 3x - 12."],
      es: ["Primero multiplica el 2 por el paréntesis: 2x/3 + 2 = x - 4.", "Ahora multiplica toda la ecuación por 3 para quitar el denominador.", "Queda: 2x + 6 = 3x - 12."]
    },
    feedback: {
      ca: { wrong: "N'estàs molt a prop! Revisa els passos quan treus el denominador 3." },
      es: { wrong: "¡Estás muy cerca! Revisa los pasos al quitar el denominador 3." }
    }
  },
  { 
    id: 16, 
    category: 'intermedio',
    title: { ca: "Problema 16", es: "Problema 16" }, 
    equation: { ca: "Un número més el seu doble és 45. Quin és el número?", es: "Un número más su doble es 45. ¿Cuál es el número?" }, 
    expectedAnswer: "15",
    hints: {
      ca: ["'Un número' és x. 'El seu doble' és 2x.", "L'equació és x + 2x = 45.", "Això significa que 3x = 45."],
      es: ["'Un número' es x. 'Su doble' es 2x.", "La ecuación es x + 2x = 45.", "Esto significa que 3x = 45."]
    },
    feedback: {
      ca: { wrong: "Si tres vegades un número és 45... quant és el número?" },
      es: { wrong: "Si tres veces un número es 45... ¿cuánto es el número?" }
    }
  },
  { 
    id: 17, 
    category: 'intermedio',
    title: { ca: "Problema 17", es: "Problema 17" }, 
    equation: { ca: "En un rectangle, la base mesura 5cm més que l'altura i el perímetre és 30cm. Quant mesura l'altura?", es: "En un rectángulo, la base mide 5cm más que la altura y el perímetro es 30cm. ¿Cuánto mide la altura?" }, 
    expectedAnswer: "5",
    hints: {
      ca: ["L'altura és x. La base és x + 5.", "El perímetre és la suma dels 4 costats: x + x + (x+5) + (x+5) = 30.", "Simplifica: 4x + 10 = 30."],
      es: ["La altura es x. La base es x + 5.", "El perímetro es la suma de los 4 lados: x + x + (x+5) + (x+5) = 30.", "Simplifica: 4x + 10 = 30."]
    },
    feedback: {
      ca: { wrong: "Recorda que un rectangle té dues bases i dues altures." },
      es: { wrong: "Recuerda que un rectángulo tiene dos bases y dos alturas." }
    }
  },
  { 
    id: 18, 
    category: 'intermedio',
    title: { ca: "Problema 18", es: "Problema 18" }, 
    equation: { ca: "Gasto 1/4 dels meus estalvis al cinema i 1/2 en el sopar. Si em queden 10€, quants estalvis tenia?", es: "Gasto 1/4 de mis ahorros en el cine y 1/2 en la cena. Si me quedan 10€, ¿cuántos ahorros tenía?" }, 
    expectedAnswer: "40",
    hints: {
      ca: ["Total estalvis = x. Cinema = x/4. Sopar = x/2.", "L'equació és: x - x/4 - x/2 = 10.", "Multiplica tot per 4 per treure denominadors: 4x - x - 2x = 40."],
      es: ["Total ahorros = x. Cine = x/4. Cena = x/2.", "La ecuación es: x - x/4 - x/2 = 10.", "Multiplica todo por 4 para quitar denominadores: 4x - x - 2x = 40."]
    },
    feedback: {
      ca: { wrong: "Si et queda 1/4 del total i això són 10€, quant era el total?" },
      es: { wrong: "Si te queda 1/4 del total y eso son 10€, ¿cuánto era el total?" }
    }
  },
  {
    id: 19,
    category: 'dificil',
    title: { ca: "Problema 19", es: "Problema 19" },
    equation: { ca: "5x + 35 = 0", es: "5x + 35 = 0" },
    expectedAnswer: "-7",
    hints: {
      ca: ["Passa el 35 a l'altre costat restant: 5x = -35.", "El resultat pot ser negatiu, no et sorprenguis.", "Divideix -35 entre 5."],
      es: ["Pasa el 35 al otro lado restando: 5x = -35.", "El resultado puede ser negativo, no te sorprendas.", "Divide -35 entre 5."]
    },
    feedback: {
      ca: { wrong: "Compte! El resultat és negatiu. Si 5x = -35, quant val x?" },
      es: { wrong: "¡Ojo! El resultado es negativo. Si 5x = -35, ¿cuánto vale x?" }
    }
  },
  {
    id: 20,
    category: 'dificil',
    title: { ca: "Problema 20", es: "Problema 20" },
    equation: { ca: "La Maria té el doble d'anys que en Joan. D'aquí a 5 anys, entre els dos sumaran 40 anys. Quants anys té en Joan ara?", es: "María tiene el doble de años que Juan. Dentro de 5 años, entre los dos sumarán 40 años. ¿Cuántos años tiene Juan ahora?" },
    expectedAnswer: "10",
    hints: {
      ca: ["Joan = x, Maria = 2x. D'aquí a 5 anys: (x+5) + (2x+5) = 40.", "Simplifica: 3x + 10 = 40.", "Ara resol: 3x = 30."],
      es: ["Juan = x, María = 2x. Dentro de 5 años: (x+5) + (2x+5) = 40.", "Simplifica: 3x + 10 = 40.", "Ahora resuelve: 3x = 30."]
    },
    feedback: {
      ca: { wrong: "Planta l'equació: (x+5) + (2x+5) = 40. No oblidis sumar 5 a cada edat!" },
      es: { wrong: "Plantea la ecuación: (x+5) + (2x+5) = 40. ¡No olvides sumar 5 a cada edad!" }
    }
  },
  {
    id: 21,
    category: 'dificil',
    title: { ca: "Problema 21", es: "Problema 21" },
    equation: { ca: "Dos ciclistes surten del mateix punt en direccions oposades: un a 15 km/h i l'altre a 25 km/h. Quantes hores (x) han de pedalar per estar a 120 km?", es: "Dos ciclistas parten del mismo punto en direcciones opuestas: uno a 15 km/h y el otro a 25 km/h. ¿Cuántas horas (x) deben pedalear para estar a 120 km?" },
    expectedAnswer: "3",
    hints: {
      ca: ["La distància total és la suma de les dues distàncies recorregudes.", "15x + 25x = 120.", "Simplifica el costat esquerre."],
      es: ["La distancia total es la suma de las dos distancias recorridas.", "15x + 25x = 120.", "Simplifica el lado izquierdo."]
    },
    feedback: {
      ca: { wrong: "Suma les dues velocitats i multiplica-les pel temps x. Ha de donar 120." },
      es: { wrong: "Suma las dos velocidades y multiplícalas por el tiempo x. Debe dar 120." }
    }
  },
  {
    id: 22,
    category: 'dificil',
    title: { ca: "Problema 22", es: "Problema 22" },
    equation: { ca: "(3x + 2)/4 - (x - 1)/2 = 3", es: "(3x + 2)/4 - (x - 1)/2 = 3" },
    expectedAnswer: "8",
    hints: {
      ca: ["El m.c.m. de 4 i 2 és 4. Multiplica tota l'equació per 4.", "Queda: (3x+2) - 2(x-1) = 12.", "Desenvolupa els parèntesis i simplifica: x + 4 = 12."],
      es: ["El m.c.m. de 4 y 2 es 4. Multiplica toda la ecuación por 4.", "Queda: (3x+2) - 2(x-1) = 12.", "Desarrolla los paréntesis y simplifica: x + 4 = 12."]
    },
    feedback: {
      ca: { wrong: "Quan multipliques per 4, recorda multiplicar el 2(x-1) correctament: -2x + 2." },
      es: { wrong: "Al multiplicar por 4, recuerda que 2(x-1) se convierte en -2x + 2, ojo con el signo." }
    }
  },
  {
    id: 23,
    category: 'dificil',
    title: { ca: "Problema 23", es: "Problema 23" },
    equation: { ca: "Un tren surt de A cap a B a 60 km/h. Tres hores després, un segon tren surt del mateix punt a 90 km/h en la mateixa direcció. Quantes hores (x) després de la sortida del segon tren s'alcançaran?", es: "Un tren sale de A hacia B a 60 km/h. Tres horas después, un segundo tren sale del mismo punto a 90 km/h en la misma dirección. ¿Cuántas horas (x) después de la salida del segundo tren se alcanzarán?" },
    expectedAnswer: "6",
    hints: {
      ca: ["Quan el segon tren ha fet x hores, el primer porta (x+3) hores.", "Per alcançar-se, han de recórrer la mateixa distància: 60(x+3) = 90x.", "Desenvolupa: 60x + 180 = 90x."],
      es: ["Cuando el segundo tren lleva x horas, el primero lleva (x+3) horas.", "Para alcanzarse, deben haber recorrido la misma distancia: 60(x+3) = 90x.", "Desarrolla: 60x + 180 = 90x."]
    },
    feedback: {
      ca: { wrong: "Igualem les distàncies: 60·(x+3) = 90·x. Resol-ho pas a pas!" },
      es: { wrong: "Igualamos las distancias: 60·(x+3) = 90·x. ¡Resuélvelo paso a paso!" }
    }
  }
];
