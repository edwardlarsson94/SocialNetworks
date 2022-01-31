import { PublicationModel } from "src/app/domain/models/Publication/publication";
import { getElapsedTime } from "./libs/formater-date-mappers";

export const setElasedTimeAllDate = (publications: PublicationModel.Publication[]): PublicationModel.Publication[] => {

    publications.forEach(element => {
        element.date.dateMap = getElapsedTime(element.date.date);
        element.comments.forEach( elementChild => {
            elementChild.date.dateMap = getElapsedTime(elementChild.date.date);
        });
    });
    return [...publications];
}