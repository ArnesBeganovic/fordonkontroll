var ArnApp = {
		//Ova klasa treba da zamjeni funkcije koje koristim iz jquerija
		post:function(ulaz){
			/*
			ulaz se sastoji od:
				ulaz.url = string koji vodi do url
				ulaz.id = string iz url koji sluzi serveru da preracuna korisnika
				ulaz.uspjeh = funkcija koja se odradi ako uspije odraditi request
				ulaz.neuspjeh = funkcija koja se odradi ako padne request
				ulaz.parametri = array parametara koji se trebaju poslati
				ulas.type = ako je JSON onda ce se izvsiti parse na rezultatu a ako je tekst onda nece.
				
				Ovako izgleda primjer koda:
				
				ArnApp.post({
					url:"getData.asp",
					type:"json",
					uspjeh:function(){bla bla bla},
					neuspjeh:function(){bla bla bla},
					parametri:[{"prvi":"sadrzaj","drugi":"sadrzaj","treci":"sadrzaj"}] - parametri trebaju imati id i userid koji je zapravo Sec kod
				})
				
				ArnApp.post({
					url:"getData.asp",
					type:"json",
					uspjeh:function(){console.log("juhu")},
					neuspjeh:function(){console.log("Call failes")},
					parametri:[{
						"id":"2015012021",
						"userid":Nosac[5],
						"sear":"1009"
					}]
				})
			*/
			
			//obavezni
			if (ulaz.url===undefined){console.log("Please provide url!");return}
			if (ulaz.type===undefined){console.log("Please provide type!");return}
			if (ulaz.contenttype === undefined) { console.log("Please provide content type!"); return }
			if (ulaz.uspjeh === undefined) { console.log("Please provide uspjeh function!"); return }
			if (ulaz.parametri===undefined){console.log("Please provide parameters!");return}
			//Pripremi parametre. Svi parametri moraju biti u jednom objektu. Idi redom i pretvori ih.
			var ListaParametara = "";
			var PreskociPrvi = 0;
			for(value in ulaz.parametri[0]){
				if(PreskociPrvi!=0) {
					ListaParametara = ListaParametara + "&";
				} else {
					PreskociPrvi = 1;
				}
				ListaParametara = ListaParametara + encodeURIComponent(value) + "=" + encodeURIComponent(ulaz.parametri[0][value])
				
			}
			
			//Pripremi request
			var xhr = new XMLHttpRequest();
			xhr.open(ulaz.type, ulaz.url, true);
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhr.onload = function() {
				if (xhr.status === 200) {
				    if (ulaz.contenttype == "JSON" || ulaz.contenttype == "json") {
						ulaz.uspjeh(JSON.parse(xhr.responseText));
					} else {
						ulaz.uspjeh(xhr.responseText);
					}
					
				}
				else {
					if (ulaz.neuspjeh===undefined){
						console.log('Request failed.  Returned status of ' + xhr.status);
					} else {
						ulaz.neuspjeh(xhr.status);
					}
				}
			};
			//Posalji request
			xhr.send(ListaParametara);

		},
		each:function(objekat,funkcija){
			for(each in objekat){
				funkcija(each,objekat[each]);
			}
		}
	}