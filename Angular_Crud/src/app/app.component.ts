import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators,FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'reactiveForm';
  reactiveForm: FormGroup;
  showInfo:any[]=[];
  isEdit = false;
  editedIndex:number=0;

  ngOnInit(): void {
    this.reactiveForm=new FormGroup({
      personalDetail:new FormGroup({
      
        fullName: new FormControl(null,[Validators.required]),
        email:new FormControl(null,[Validators.required,Validators.email]),
      }),
      mobileNumber:new FormControl(null,Validators.required),
     
      address:new FormControl(null,Validators.required)
    
    });
  }
  onSubmit(){
    console.log(this.reactiveForm);
  

    if (this.isEdit) {
      this.showInfo[this.editedIndex] = this.reactiveForm.value;
      this.isEdit = false;
    } else {
      this.showInfo.push(this.reactiveForm.value);
    }

    this.reactiveForm.reset();
  }

  //custom validator
  noSpaceAllowed(control:FormControl){
    if(control.value!=null && control.value.indexOf(' ')!=-1){
      return{noSpaceAllowed:true}
    }
    return null;
  }
  deleteElement(index:number){
    if (index >= 0 && index < this.showInfo.length) {
   
      this.showInfo.splice(index, 1);
      console.log('Element deleted:', this.showInfo);
    } else {
      console.error('Invalid index provided for deletion.');
    }
  }

Edit(index: number, i: any) {
  this.isEdit = true;
  this.editedIndex = index;
  // Accessing values using get method for nested form controls
  this.reactiveForm.patchValue({
    personalDetail: {
      fullName: i.personalDetail.fullName,
      email: i.personalDetail.email
    },
    mobileNumber: i.mobileNumber,
    address: i.address
  });
}


}
