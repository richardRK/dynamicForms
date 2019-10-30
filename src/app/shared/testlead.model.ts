export class TestLead {
  description: any;
  libraryCode: any;
  libraryType: any;
  libraryName: any;
}

export class Employee {
  description: any;
  libraryCode: any;
  libraryType: any;
  libraryName: any;
  //other: [{libraryName:libraryName},{libraryType}]
  other: Array<{ libraryName: any; libraryType: any }> = [];
}


export class Employee1 {
    libraryCode: any;
    libraryName: any;
  }
  

  
export class Test {
    libraryCode: any; 
  }

  export class EditProd{
    libraryType: any;
    libraryName: any;
    status:any;
  }