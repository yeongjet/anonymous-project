enum TokenType {
  Identifier,
  Delimiter,
  Keyword
}

export interface Token {
  line: number
  column: number
  type: TokenType,
  value: string
}

export enum OperatorKeyword {
  Func = "func",
  Times = "times",
  Frac = "frac",
  Sqrt = "sqrt",
  Minus = "minus",
  Power = "power",
  Sub = "sub",
}

export enum EnglishLetter {
  a = "a",
  b = "b",
  c = "c",
  d = "d",
  e = "e",
  f = "f",
  g = "g",
  h = "h",
  i = "i",
  j = "j",
  k = "k",
  l = "l",
  m = "m",
  n = "n",
  o = "o",
  p = "p",
  q = "q",
  r = "r",
  s = "s",
  t = "t",
  u = "u",
  v = "v",
  w = "w",
  x = "x",
  y = "y",
  z = "z",
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
  F = "F",
  G = "G",
  H = "H",
  I = "I",
  J = "J",
  K = "K",
  L = "L",
  M = "M",
  N = "N",
  O = "O",
  P = "P",
  Q = "Q",
  R = "R",
  S = "S",
  T = "T",
  U = "U",
  V = "V",
  W = "W",
  X = "X",
  Y = "Y",
  Z = "Z",
}

export enum LowercaseGreekKeyword {
    Alpha = 'alpha',
    Beta = 'beta',
    Gamma = 'gamma',
    Delta = 'delta',
    Epsilon = 'epsilon',
    VarEpsilon = 'varepsilon',
    Zeta = "zeta",
    Eta = "eta",
    Theta = "theta",
    VarTheta = "vartheta",
    Iota = "iota",
    Kappa = "kappa",
    Lambda = "lambda",
    Mu = "mu",
    Nu = "nu",
    Xi = "xi",
    Pi = "pi",
    VarPi = "varpi",
    Rho = "rho",
    VarRho = "varrho",
    Sigma = "sigma",
    VarSigma = "varsigma",
    Tau = "tau",
    Upsilon = "upsilon",
    Phi = "phi",
    VarPhi = "varphi",
    Chi = "chi",
    Psi = "psi",
    Omega = "omega"
}

export enum UppercaseGreekKeyword {
  Gamma = 'Gamma',
  Delta = 'Delta',
  Theta = "Theta",
  Lambda = "Lambda",
  Xi = "Xi",
  Pi = "Pi",
  Sigma = "Sigma",
  Upsilon = "Upsilon",
  Phi = "Phi",
  Psi = "Psi",
  Omega = "Omega"
}

export interface ParseState {
  lineNumber: number;
}

//Exclude: BlankSpace, [, \, ], _, {, }
export const letters = [
  "!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/",
  "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
  ":", ";", "<", "=", ">", "?", "@",
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P",
  "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
  "^", "`",
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p",
  "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
  "|", "~"
];

const greekAlphabet = [
  ['a', 'l', 'p', 'h', 'a'],
]
