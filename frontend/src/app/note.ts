export interface Note {
    id: number;
    body: string;
    creation_datetime: string;
    utc_creation_datetime: string | undefined;
    local_creation_datetime: string | undefined;
    creation_date: string;
}