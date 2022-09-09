import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Claim } from '../model/claim';
import { Member } from '../model/member';
import { AuthService } from '../service/auth.service';
import { ClaimService } from '../service/claim.service';
import { MemberService } from '../service/member.service';

@Component({
  selector: 'app-memberdashboard',
  templateUrl: './memberdashboard.component.html',
  styleUrls: ['./memberdashboard.component.css']
})
export class MemberdashboardComponent implements OnInit {

  constructor(private router : Router,
    private authService : AuthService,
    private memberService : MemberService,
    private datePipe: DatePipe,
    private claimService : ClaimService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    let memberId = this.route.snapshot.params['memberId'];
  }

  displayedColumns: string[] = ['memberId','firstName','lastName','physician','claimId','claimAmount','submittedDate', 'submitClaim'];
  dataSource = new MatTableDataSource();

  finMemberId : number | any;

  addMember   : boolean | any = true;
  findMember  : boolean | any = false;
  searchMemberTable   : boolean | any = true;
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
    this.searchMemberTable = false;

    this.searchMember = member;
    console.log("claim member: " + member.memberId);
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


  cancel(){
    this.searchMemberTable = false;
    this.addClaimForm = false;
  }



  logout(){
    console.log("Inside AppComponent.");
    
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
