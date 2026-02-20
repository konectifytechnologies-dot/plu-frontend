export type LandlordTypeValue = 'individual' | 'company' | ''
export interface LandlordAdditionalData {
  landlord_type: LandlordTypeValue
  // add more fields later as needed
}

export interface LandlordType {
    id:string,
    name:string,
    email:'email',
    number:string,
    role:string,
    agent:string | null,
    agent_id:string |null,
    additional_data:any
}

export interface UnitType {
  id:string,
  name:string,
  bedrooms:number | null ,
  rent:number | null ,
  property_id:string,
  property:string,
  tenant:string

}

export type UnitFormValues = {
  name:string,
  bedrooms:number | '',
  rent:number | '',
  property_id:string,
  property:string,
}

export type ItemType = {
    name:string | null,
    id:string | null
}

export interface Property {
  id:string,
  name:string | null,
  picture:string | null,
  units:number,
  location:string | null,
  water_cost:number,
  property_type:string | null,
  landlord_id:string | null,
  landlord:string | null,
  has_service_charge:Boolean,
  service_charge:string,
  agent:string

}




export type LandlordFormValues = {
  name: string | undefined,
  email: string | undefined,
  number: string |undefined
  additional_data:any
}

export interface Tenant {
  id:string,
  name:string,
  number:string,
  email:string | null,
  property_id: string | null,
  unit_id:string,
  house:string,
  house_number:string,
  start_date:string,
  user_id:string
}

