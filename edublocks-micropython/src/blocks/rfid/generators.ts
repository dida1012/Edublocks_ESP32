export default function define(Python: Blockly.BlockGenerators) {

	Python['import'] = function (block) {
		const code =    'import MFRC522\n'+
                        'import write\n'+
                        'import read\n'+
                        'from sys import exit\n'+
                        'from uping import ping\n';
		return code;
    };
    Python['init_DB'] = function (block) {
        const code =    'blueDevices=[]\n'+
                        'whiteDevices=[]\n'+
                        'activeDevices=[]\n';
		return code;
    };
    Python['defineMenuFunction'] = function (block) {
		const code =    'def drawMenu(selection, items):\n'+
                        '\tzusatz = ["", "", "", "", "", "", "", "", ""] #Array must be at least items.length+1\n'+
                        '\tzusatz[selection] = " <--"\n'+
                        '\tprint ("\\n" * 100)\n'+
                        '\tfor i in range(len(items)):\n'+
                        '\t\tprint(items[i]+zusatz[i])\n'+
                        '\ttime.sleep(0.5)\n';
		return code;
    };
    Python['drawMenu'] = function (block) {
        const selection = block.getFieldValue('selection');
        const items = block.getFieldValue('items');
		const code =    'drawMenu('+selection+','+items+')\n';
		return code;
    };
    Python['print_RFID_Data'] = function (block) {
		const code =    'print(read.do_read()[0])\n';
		return code;
    };
    Python['save_RFID_Data'] = function (block) {
        const saveTo = block.getFieldValue('saveTo');
		const code =  ''+saveTo+'=read.do_read()[0]\n';
		return code;
    };
    Python['write_RFID_Data'] = function (block) {
        const data = block.getFieldValue('data');
		const code =    'write.do_write('+data+')\n';
		return code;
    };
    Python['else'] = function (block) {
        let branch = Blockly.Python.statementToCode(block, 'DO');
        branch = Blockly.Python.addLoopTrap(branch, block.id) || Blockly.Python.PASS;
        return 'else:\n' + branch;
      };
    Python['exit'] = function (block) {
    return 'exit()\n';
    };
    Python['scanAndSave'] = function (block) {
        const writeTo = block.getFieldValue('writeTo');
        const suffix = block.getFieldValue('suffix');
        const code =    'try:\n'+
                        '\taddress = "192.168.4."+str('+suffix+')\n'+
                        '\tping(address)\n'+
                        '\t'+writeTo+'.append(address)\n'+
                        '\tprint("Ping success to "+address)\n'+
                        'except OSError:\n'+
                        '\tprint("No Connection to "+address)\n';
                        
        return code;        
    };
    Python['appendToList'] = function (block) {
        const list = block.getFieldValue('list');
        const data = block.getFieldValue('data');
        const code = list+'.append('+data+')\n';
        return code;        
    };
}



    

