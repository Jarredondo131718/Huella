
export const vsIOTConstants = {
  emailRE 		: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  soloLetras  : ' áéíóúabcdefghijklmnñopqrstuvwxyzÁÉÍÓÚABCDEFGHIJKLMNÑOPQRSTUVWXYZ',//Se define todo el abecedario que se quiere que se muestre.
  Text        : ' áéíóúabcdefghijklmnñopqrstuvwxyzÁÉÍÓÚABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789.,;%$#@?:+-',//Se define todo el abecedario que se quiere que se muestre.
  regexLetras : /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g,
  regexDigitos: /^([0-9])*$/,
  soloDigitos : '0123456789',
	FormatYYYMMDDLG : 'YYYY-MM-DD HH:mm:ss',
	FormatYYYMMDDSM : 'YYYY-MM-DD',
  vsTipoProductos : {
    VSProCreditos : 0, 
    VSProDisponibles : 1, 
    VSProContractuales : 2,
    VSProCDTS : 3,  
    VSProAportes : 4, 
    VSProConvenios : 5,
    VSProPreliquidaciones : 6, 
    VSProSeguros : 9,  
    VSTblCreditos:'CreCreditos',
    VSTblDisponibles:'AhoDisponibles',
    VSTblContractuales:'AhoContractuales',  
    VSTblCDTS:'AhoCDTS',  
    VSTblAportes:'AhoAportes',
    VSTblConvenios:'AhoConvenios',
    VSTblPreliquidaciones:'Preliquidaciones', 
    VSTblSeguros:'SegSeguros',                               
  }

}



