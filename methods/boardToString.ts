function boardToString(layout: Array<number>){

    let text: string

    const newLayout: Array<string> = layout.map((layoutItem,index) => {

        let cell: string = '⬜️'
        if(layoutItem == 1) cell = '❌'
        else if(layoutItem == 2) cell = '🔴'

        if(index == 2 || index == 5 || index == 8){

            cell += '\n'
        }

        return cell
    })

    return newLayout.join('')
}


export default boardToString