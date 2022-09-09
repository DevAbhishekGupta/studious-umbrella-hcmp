import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from '../model/member';
import { MemberDetails } from '../model/member-details';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http : HttpClient) { }

  private REGISTER_MEMBER : string = `http://localhost:8080/mem/api/addMember`;

  private SEARCH_MEMBER_BYID : string = `http://localhost:8080/mem/api/getMemberDetailsById`;

  registerMember(member : Member) : Observable<Member>{
    return this.http.post<Member>(this.REGISTER_MEMBER,member);
  }

  searchByMemberId(memberId : number) : Observable<Array<MemberDetails>> {
    return this.http.get<Array<MemberDetails>>(`${this.SEARCH_MEMBER_BYID}/${memberId}`,{headers : {"Authorization" : `Bearer ${localStorage.getItem('token')}`}});
  }

}
