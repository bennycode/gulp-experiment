function GetName(firstName:string, lastName:string) {
    console.log('2');
    console.log('3');
    console.log('4');
    throw new Error("Source map test");
}

GetName("Benny", "Neugebauer");
