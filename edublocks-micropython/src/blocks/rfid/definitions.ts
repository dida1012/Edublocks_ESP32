export default function define(Blocks: Blockly.BlockDefinitions) {

    Blocks['import'] = {
      init() {
        this.appendDummyInput()
            .appendField('import needed libraries');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
        this.setTooltip('Imports all important libraries.');
    },
    };
    Blocks['init_DB'] = {
        init() {
          this.appendDummyInput()
              .appendField('init Database');
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(120);
          this.setTooltip('declares some empty Arrays');
      },
      };
    Blocks['defineMenuFunction'] = {
        init() {
          this.appendDummyInput()
              .appendField('define DrawMenu functions');
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(120);
          this.setTooltip('define drawMenu Function');
      },
      };
    Blocks['drawMenu'] = {
    init() {
        this.appendDummyInput()
            .appendField('draw Menu')
            .appendField(new Blockly.FieldTextInput('selection'), 'selection')
            .appendField(new Blockly.FieldTextInput('items'), 'items');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
        this.setTooltip('call drawMenu Function');
    },
    };
    Blocks['print_RFID_Data'] = {
        init() {
            this.appendDummyInput()
                .appendField('print_RFID_Data')
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(120);
            this.setTooltip('call RFID Read Function and print');
        },
        };
    Blocks['save_RFID_Data'] = {
        init() {
            this.appendDummyInput()
                .appendField('save_RFID_Data')
                .appendField(new Blockly.FieldTextInput('saveTo'), 'saveTo');
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(120);
            this.setTooltip('call RFID Read Function and save to var');
        },
        };
    Blocks['write_RFID_Data'] = {
        init() {
            this.appendDummyInput()
                .appendField('write_RFID_Data')
                .appendField(new Blockly.FieldTextInput('data'), 'data');
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(120);
            this.setTooltip('call RFID Write Function and write data');
        },
        };
    Blocks['else'] = {
        init() {
            this.appendDummyInput()
            .appendField('else:');
            this.appendStatementInput('DO')
            .appendField('');
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(120);
            this.setTooltip('Custom Else statement (next statement allowed)');
        },
        };
    Blocks['exit'] = {
        init() {
            this.appendDummyInput()
                .appendField('exit');
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(120);
            this.setTooltip('Exits the script');
        },
        };
    Blocks['scanAndSave'] = {
        init() {
            this.appendDummyInput()
                .appendField('scanAndSave')
                .appendField(new Blockly.FieldTextInput('writeTo'), 'writeTo')
                .appendField(new Blockly.FieldTextInput('suffix'), 'suffix');
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(120);
            this.setTooltip('Scans Network 192.168.4.suffix and saves it to an array');
        },
        };
    Blocks['appendToList'] = {
        init() {
            this.appendDummyInput()
                .appendField('appendToList')
                .appendField(new Blockly.FieldTextInput('list'), 'list')
                .appendField(new Blockly.FieldTextInput('data'), 'data');
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(120);
            this.setTooltip('Appends Data to a List');
        },
        };
}
