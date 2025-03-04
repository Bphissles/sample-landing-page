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
      parserCode: `const fs = require("fs");
        // Recognizer class: Converts input code into tokens
        class Recognizer {
          constructor(input) {
            this.tokens = this.tokenize(input); // Tokenizes the input code
            this.position = 0; // position tracking
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
                    throw new Error(\`Unexpected token at: \${remaining}\`);
                }
            }

            return tokens; 
          }

          look() {
            return this.tokens[this.position];
          }

          consume(expectedType) {
            if (this.look() && this.look().type === expectedType) {
              return this.tokens[this.position++];
            } else {
              throw new Error(\`Expected \${expectedType}, found \${this.look() ? this.look().value : "EOF"}\`);
            }
          }

          match(expectedType) {
            if (this.look() && this.look().type === expectedType) {
              return this.tokens[this.position++];
            }
            return null;
          }

          eof() {
            return this.position >= this.tokens.length;
          }
        }

        // Parser class: Responsible for parsing tokenized input and validating syntax
        class Parser {
          constructor(tokenizer) {
            this.recognizer = tokenizer;
          }

          parseProgram() {
            while (!this.recognizer.eof()) {
              this.parseStatement();
            }
            console.log("Program is syntactically correct.");
          }

          parseStatement() {
            if (this.recognizer.match("LET")) {
              this.parseDeclaration();
            } else if (this.recognizer.look().type === "IDENTIFIER") {
              this.parseAssignment();
            } else if (this.recognizer.match("IF")) {
              this.parseIfStatement();
            } else if (this.recognizer.match("WHILE")) {
              this.parseWhileStatement();
            } else if (this.recognizer.match("PRINT")) {
              this.parsePrintStatement();
            } else {
              throw new Error(\`Invalid statement at \${this.recognizer.look().value}\`);
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

          parseIfStatement() {
            this.recognizer.consume("LEFTPARENT");
            this.parseCondition();
            this.recognizer.consume("RIGHTPARENT");
            this.recognizer.consume("LEFTBRACE");

            while (this.recognizer.look() && this.recognizer.look().type !== "RIGHTBRACE") {
              this.parseStatement();
            }

            this.recognizer.consume("RIGHTBRACE");
          }

          parseWhileStatement() {
            this.recognizer.consume("LEFTPARENT");
            this.parseCondition();
            this.recognizer.consume("RIGHTPARENT");
            this.recognizer.consume("LEFTBRACE");

            while (this.recognizer.look() && this.recognizer.look().type !== "RIGHTBRACE") {
              this.parseStatement();
            }

            this.recognizer.consume("RIGHTBRACE");
          }

          parsePrintStatement() {
            this.recognizer.consume("LEFTPARENT");
            this.parseExpression();
            this.recognizer.consume("RIGHTPARENT");
            this.recognizer.consume("SEMICOLON");
          }

          parseCondition() {
            this.parseExpression(); 
            if (!this.recognizer.look() || this.recognizer.look().type !== "REL_OP") {
              throw new Error(\`Expected REL_OP, found \${this.recognizer.look() ? this.recognizer.look().value : "EOF"}\`);
            }
            this.recognizer.consume("REL_OP");
            this.parseExpression();
          }

          parseExpression() {
            this.parseTerm();
            while (this.recognizer.look() && (this.recognizer.look().type === "PLUS" || this.recognizer.look().type === "MINUS")) {
              this.recognizer.consume(this.recognizer.look().type);
              this.parseTerm();
            }
          }

          parseTerm() {
            this.parseFactor();
            while (this.recognizer.look() && (this.recognizer.look().type === "MULTIPLY" || this.recognizer.look().type === "DIVIDE")) {
              this.recognizer.consume(this.recognizer.look().type);
              this.parseFactor();
            }
          }

          parseFactor() {
            if (this.recognizer.match("NUMBER")) {
              return;
            } else if (this.recognizer.match("IDENTIFIER")) {
              return;
            } else if (this.recognizer.match("LEFTPARENT")) {
              this.parseExpression();
              this.recognizer.consume("RIGHTPARENT");
            } else {
              throw new Error(\`Unexpected token: \${this.recognizer.look().value}\`);
            }
          }
        }

        if (process.argv.length < 3) {
          console.error("Usage: node parser.js <filename>");
          process.exit(1);
        }

        const filename = process.argv[2];

        fs.readFile(filename, "utf8", (err, data) => {
          if (err) {
            console.error("Error reading file:", err);
            process.exit(1);
          }

          try {
            console.log(\`Parsing file: \${filename}\`);
            const tokenizer = new Recognizer(data);
            const parser = new Parser(tokenizer);
            parser.parseProgram();
          } catch (error) {
            console.error("Syntax Error:", error.message);
          }
        });`,
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
