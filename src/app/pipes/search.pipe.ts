import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform (items: any[], term): any {
    return term? items.filter

(testuser=>testuser.test.titre.toLowerCase().indexOf(term.toLowerCase())!==-1):items;
 
  }

/*  transform(item: Matiere[], searchText: string): Matiere[] {
    if(!item ||!searchText) return item;
searchText = searchText.toLowerCase();
return item.filter( it => {
      return it.nom.toLowerCase().indexOf(searchText.toLowerCase()) !== -1});
}
*/

  

}
