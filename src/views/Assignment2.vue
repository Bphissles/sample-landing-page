<template>
  <div class="container">
    <h2 class="p-5">JavaScript Code Parser</h2>
    <hr>
    
    <div class="px-5">
      <h3>Enter Code to Parse:</h3>
      <div class="d-flex gap-3 align-items-end">
        <textarea v-model="inputCode" rows="6" cols="25"></textarea>
        <div class="">
        <button @click="executeParser" class="btn btn-primary">Parse Code</button>
          <div v-if="message" :class="{'alert alert-danger mb-0 mt-3': isError, 'alert alert-success mb-0 mt-3': !isError}">
            {{ message }}
          </div>
        </div>
      </div>
    </div>

    <div class="row px-5 mt-5">
      <div class="col-sm-3">
        <h3>Output:</h3>
        <pre v-if="!isError">{{ output }}</pre>
        <pre v-else>Error</pre>
      </div>
      <div class="col-sm-9">
        <h3>Parser Code:</h3>
        <pre><code>{{ parserCode }}</code></pre>
      </div>
    </div>
    
  </div>
</template>

<script>
class Recognizer {
  constructor(input) {
    this.tokens = this.tokenize(input);
    this.position = 0;
  }

  tokenize(input) {
    const patterns = [
      { type: "LET", regex: /^let\b/i },
      { type: "IF", regex: /^if\b/i },
      { type: "WHILE", regex: /^while\b/i },
      { type: "PRINT", regex: /^print\b/i },
      { type: "IDENTIFIER", regex: /^[a-zA-Z_][a-zA-Z0-9_]*/ },
      { type: "NUMBER", regex: /^\d+/ },
      { type: "EQUALS", regex: /^=/ },
      { type: "REL_OP", regex: /^(==|!=|<=|>=|<|>)/ },
      { type: "PLUS", regex: /^\+/ },
      { type: "MINUS", regex: /^-/ },
      { type: "MULTIPLY", regex: /^\*/ },
      { type: "DIVIDE", regex: /^\// },
      { type: "LEFTPARENT", regex: /^\(/ },
      { type: "RIGHTPARENT", regex: /^\)/ },
      { type: "LEFTBRACE", regex: /^\{/ },
      { type: "RIGHTBRACE", regex: /^\}/ },
      { type: "SEMICOLON", regex: /^;/ },
      { type: "WHITESPACE", regex: /^\s+/, ignore: true }
    ];

    let tokens = [];
    let remaining = input;

    while (remaining.length > 0) {
      let matched = false;

      for (let pattern of patterns) {
        const match = remaining.match(pattern.regex);
        if (match && match.index === 0) {
          if (!pattern.ignore) {
            tokens.push({ type: pattern.type, value: match[0] });
          }
          remaining = remaining.slice(match[0].length);
          matched = true;
          break;
        }
      }

      if (!matched) {
        throw new Error(`Unexpected token at: ${remaining}`);
      }
    }

    return tokens;
  }

  eof() {
    return this.position >= this.tokens.length;
  }

  look() {
    return this.tokens[this.position];
  }

  consume(expectedType) {
    if (this.look() && this.look().type === expectedType) {
      return this.tokens[this.position++];
    } else {
      throw new Error(`Expected ${expectedType}, found ${this.look() ? this.look().value : "EOF"}`);
    }
  }

  match(expectedType) {
    if (this.look() && this.look().type === expectedType) {
      return this.tokens[this.position++];
    }
    return null;
  }
}

class Parser {
  constructor(tokenizer) {
    this.recognizer = tokenizer;
  }

  parseProgram() {
    while (!this.recognizer.eof()) {
      this.parseStatement();
    }
    return "Program is syntactically correct.";
  }

  parseStatement() {
    if (this.recognizer.match("LET")) {
      this.parseDeclaration();
    } else if (this.recognizer.look()?.type === "IDENTIFIER") {
      this.parseAssignment();
    } else {
      throw new Error(`Syntax Error: Unexpected token ${this.recognizer.look()?.value}`);
    }
  }

  parseDeclaration() {
    this.recognizer.consume("IDENTIFIER");
    this.recognizer.consume("EQUALS");
    this.parseExpression();
    this.recognizer.consume("SEMICOLON");
  }

  parseAssignment() {
    this.recognizer.consume("IDENTIFIER");
    this.recognizer.consume("EQUALS");
    this.parseExpression();
    this.recognizer.consume("SEMICOLON");
  }

  parseExpression() {
    if (!this.recognizer.match("NUMBER") && !this.recognizer.match("IDENTIFIER")) {
      throw new Error(`Syntax Error: Expected NUMBER or IDENTIFIER, found ${this.recognizer.look()?.value ?? "EOF"}`);
    }
  }
}

export default {
  data() {
    return {
      parserCode: `import re

# Token types
TOKEN_TYPES = {
    'LET': r'let',
    'IF': r'if',
    'WHILE': r'while',
    'PRINT': r'print',
    'IDENTIFIER': r'[a-zA-Z_][a-zA-Z0-9_]*',
    'NUMBER': r'\d+',
    'EQUAL': r'=',
    'OP': r'[+\-*/]',
    'REL_OP': r'==|!=|<=|>=|<|>',
    'SEMICOLON': r';',
    'LBRACE': r'\{',
    'RBRACE': r'\}',
    'LPAREN': r'\(',
    'RPAREN': r'\)'
}

# Tokenizer
class Tokenizer:
    def __init__(self, code):
        self.tokens = self.tokenize(code)
        self.pos = 0
    
    def tokenize(self, code):
        tokens = []
        code = code.strip()
        while code:
            match = None
            for token_type, pattern in TOKEN_TYPES.items():
                regex = re.compile(f'^{pattern}')
                match = regex.match(code)
                if match:
                    tokens.append((token_type, match.group(0)))
                    code = code[len(match.group(0)):].strip()
                    print(f'Tokenized: {token_type} -> {match.group(0)}')
                    break
            if not match:
                print(f'Error: Invalid token at: {code}')
                raise SyntaxError(f'Invalid token at: {code}')
        return tokens
    
    def peek(self):
        return self.tokens[self.pos] if self.pos < len(self.tokens) else None
    
    def consume(self, expected_type=None):
        token = self.peek()
        if token is None:
            print("Error: Unexpected end of input")
            raise SyntaxError("Unexpected end of input")
        if expected_type and token[0] != expected_type:
            print(f'Error: Expected {expected_type}, but found {token[1]}')
            raise SyntaxError(f'Expected {expected_type}, but found {token[1]}')
        print(f'Consumed: {token}')
        self.pos += 1
        return token

# Parser
class Parser:
    def __init__(self, tokenizer):
        self.tokenizer = tokenizer
    
    def parse_program(self):
        while self.tokenizer.peek():
            self.parse_statement()
        print("Valid syntax!")
    
    def parse_statement(self):
        token = self.tokenizer.peek()
        print(f'Parsing statement: {token}')
        if token[0] == 'LET':
            self.parse_declaration()
        elif token[0] == 'IDENTIFIER':
            self.parse_assignment()
        elif token[0] == 'IF':
            self.parse_if_statement()
        elif token[0] == 'WHILE':
            self.parse_while_statement()
        elif token[0] == 'PRINT':
            self.parse_print_statement()
        else:
            print(f'Error: Unexpected token: {token}')
            raise SyntaxError(f'Unexpected token: {token}')
    
    def parse_declaration(self):
        print("Parsing declaration")
        self.tokenizer.consume('LET')
        self.tokenizer.consume('IDENTIFIER')
        self.tokenizer.consume('EQUAL')
        self.parse_expression()
        self.tokenizer.consume('SEMICOLON')
    
    def parse_assignment(self):
        print("Parsing assignment")
        self.tokenizer.consume('IDENTIFIER')
        self.tokenizer.consume('EQUAL')
        self.parse_expression()
        self.tokenizer.consume('SEMICOLON')
    
    def parse_if_statement(self):
        print("Parsing if-statement")
        self.tokenizer.consume('IF')
        self.tokenizer.consume('LPAREN')
        self.parse_condition()
        self.tokenizer.consume('RPAREN')
        self.tokenizer.consume('LBRACE')
        while self.tokenizer.peek() and self.tokenizer.peek()[0] != 'RBRACE':
            self.parse_statement()
        self.tokenizer.consume('RBRACE')
    
    def parse_while_statement(self):
        print("Parsing while-statement")
        self.tokenizer.consume('WHILE')
        self.tokenizer.consume('LPAREN')
        self.parse_condition()
        self.tokenizer.consume('RPAREN')
        self.tokenizer.consume('LBRACE')
        while self.tokenizer.peek() and self.tokenizer.peek()[0] != 'RBRACE':
            self.parse_statement()
        self.tokenizer.consume('RBRACE')
    
    def parse_print_statement(self):
        print("Parsing print-statement")
        self.tokenizer.consume('PRINT')
        self.tokenizer.consume('LPAREN')
        self.parse_expression()
        self.tokenizer.consume('RPAREN')
        self.tokenizer.consume('SEMICOLON')
    
    def parse_condition(self):
        print("Parsing condition")
        self.parse_expression()
        self.tokenizer.consume('REL_OP')
        self.parse_expression()
    
    def parse_expression(self):
        print("Parsing expression")
        self.parse_term()
        while self.tokenizer.peek() and self.tokenizer.peek()[0] == 'OP':
            self.tokenizer.consume('OP')
            self.parse_term()
    
    def parse_term(self):
        token = self.tokenizer.peek()
        print(f'Parsing term: {token}')
        if token[0] == 'NUMBER':
            self.tokenizer.consume('NUMBER')
        elif token[0] == 'IDENTIFIER':
            self.tokenizer.consume('IDENTIFIER')
        elif token[0] == 'LPAREN':
            self.tokenizer.consume('LPAREN')
            self.parse_expression()
            self.tokenizer.consume('RPAREN')
        else:
            print(f'Error: Unexpected token in expression: {token}')
            raise SyntaxError(f'Unexpected token in expression: {token}')

# Run the parser
code = """
let x = 5;
if ((x > 2)) {
    x = x + 1;
}
print(x);
"""
try:
    tokenizer = Tokenizer(code)
    parser = Parser(tokenizer)
    parser.parse_program()
except SyntaxError as e:
    print("Syntax Error:", e)`,
      inputCode: "let x = 5;", 
      output: "",
      message: "",
      isError: false
    };
  },
  methods: {
    executeParser() {
      try {
        const tokenizer = new Recognizer(this.inputCode);
        const parser = new Parser(tokenizer);
        this.output = JSON.stringify(tokenizer.tokens, null, 2);
        this.message = parser.parseProgram();
        this.isError = false;
      } catch (error) {
        this.output = `Error: ${error.message}`;
        this.message = error.message;
        this.isError = true;
      }
    }
  }
};
</script>

<style>
pre {
  background: #f4f4f4;
}

.navbar-nav {
  display: none !important;
}
</style>
