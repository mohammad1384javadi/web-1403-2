// C01 Tamrin - Javadizade
var sum = Number(process.argv[2]) + Number(process.argv[3]);
if (isNaN(sum) == false){
    console.log("Sum of Your Numbers:", sum);
}
else{
    console.log("Please Enter Number...");
}