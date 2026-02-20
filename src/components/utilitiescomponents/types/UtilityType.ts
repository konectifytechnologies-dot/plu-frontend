export type WaterReading = {
    id:string,
    property_id:string,
    unit_id:string,
    current_reading:number,
    total_water_cost:number,
    previous_reading:number,
    month:string,
    year:number,
    date:string,
    property:string,
    house:string

}

export type WaterReadingFormValues = {
    property_id:string,
    unit_id:string,
    current_reading:number,
    previous_reading:number,
    month:string
}
