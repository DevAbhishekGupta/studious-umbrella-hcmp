import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Claim } from '../model/claim';
import { Member } from '../model/member';
import { AuthService } from '../service/auth.service';
import { ClaimService } from '../service/claim.service';
import { MemberService } from '../service/member.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {

  constructor(private router : Router,
    private authService : AuthService,
    private memberService : MemberService,
    private datePipe: DatePipe,
    private claimService : ClaimService) { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['memberId','firstName','lastName','physician','claimId','claimAmount','submittedDate', 'submitClaim'];
  dataSource = new MatTableDataSource();

  addMember   : boolean | any = true;
  findMember  : boolean | any = false;
  searchMemberTable   : boolean | any = false;
  addClaimForm    : boolean | any = false;

  memberForm: FormGroup | any;
  
  searchMember  : Member = new Member();
  member  : Member = new Member();
  members : Array<Member> = [];
  data    : {} | any;

  claim : Claim = new Claim();
  claims : Array<Claim> = [];

  physicianSelected = 1;
  claimTypeSelected : string | any = "Vision";
  claimid : string | any;

  claimForm(member : Member){
    this.addClaimForm = true;
    this.findMember = false;
    this.searchMemberTable = false;
    this.addMember = false;

    this.searchMember = member;
    console.log("claim member: " + member.memberId);
  }

  ngFindMember(){
    this.searchMember = new Member();
    console.log("this.ngFindMember: " + this.findMember);
    this.findMember = true;
    this.searchMemberTable = false;
    this.addMember = false;
    this.addClaimForm = false;
    console.log("inside ngFindMember");
    console.log("this.ngFindMember: " + this.findMember);
    
  }


  ngAddMember(){
    console.log("this.addMember: " + this.addMember);
    this.findMember = false;
    this.searchMemberTable = false;
    this.addMember = true;
    console.log("inside ngAddMember");
    console.log("this.addMember: " + this.addMember);
    
  }

  claimSubmit(){
    this.claim.fkMemberId = this.searchMember.memberId;
    this.claim.claimType = this.claimTypeSelected;
    this.claim.claimDate = this.datePipe.transform(this.claim.claimDate,'MM/dd/yyyy');
    this.claimService.claimSubmit(this.claim).subscribe(data => {
      this.data = JSON.stringify(data);
      console.log("Added Data to the DB");
      alert("Added data to backend DB.");
      this.claims.push(this.data);
    });
  }

  searchByMemberId(){
    this.memberService.searchByMemberId(this.searchMember.memberId).subscribe(data => {
      this.searchMemberTable = true;
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = data;
    });
  }

  registerMember(){
    console.log("DOB: "+ this.member.dob);
    console.log("DOB: "+ this.datePipe.transform(this.member.dob,'MM/dd/yyyy'));
    this.member.dob = this.datePipe.transform(this.member.dob,'MM/dd/yyyy');
    this.memberService.registerMember(this.member).subscribe(data => {
      this.data = JSON.stringify(data);
      console.log("Added Data to the DB");
      alert("Added data to backend DB.");
      this.members.push(this.data);
    }, error => {
      console.log(error);
      
    });

    this.data = {};
    this.member = new Member();
  }

  cancel(){
    this.addMember = false;
    this.findMember = false;
    this.searchMemberTable = false;
    this.addClaimForm = false;
  }



  logout(){
    console.log("Inside AppComponent.");
    
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
