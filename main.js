$(function(){
    $('#searchButton').on('click', function() {
        if ($('#searchWords').val()) {
            let searchWords = createSearchWords($('#searchWords').val())
            let searchParameterOfMinDate = createSearchParameterOfMinDate($('#fromDatetime').val())
            let searchParameterOfMaxDate = createSearchParameterOfMaxDate($('#toDatetime').val())
            let result_url = `https://www.google.com/search?q=${searchWords}&source=lnt&tbs=cdr%3A1%2Ccd${searchParameterOfMinDate}${searchParameterOfMaxDate}&tbm=`

            window.open(result_url, '_blank')
        }
    })

    $('#gb-2007-03').on('click', function() {
        $('#fromDatetime').val('2007-03-01')
        $('#toDatetime').val('2007-08-31')
    })

    $('#gb-2011-03').on('click', function() {
        $('#fromDatetime').val('2011-03-01')
        $('#toDatetime').val('2011-08-31')
    })

    $('#gb-madou-seiryu').on('click', function() {
        $('#fromDatetime').val('2013-02-16')
        $('#toDatetime').val('2013-08-31')
    })
})

function createSearchWords(searchWords) {
    return addYGO(searchWords).replace(" ", "+")
}

function addYGO(searchWords) {
    const ygo = "遊戯王"

    if (!searchWords.match(/¥s/) && needToAddYGO(searchWords).length) {
        searchWords = searchWords + " " + ygo
    }

    return searchWords
}

function needToAddYGO(searchWords) {
    let pettern = new RegExp(".*" + searchWords.split("").join("{1}.*"))

    return wordsNeedToAddYGO().filter(RegExp.prototype.test, pettern)
}

function createSearchParameterOfMinDate(date) {

    return createSearchParameterOfDate(date, "min")
}

function createSearchParameterOfMaxDate(date) {

    return createSearchParameterOfDate(date, "max")
}

function createSearchParameterOfDate(date, minOrMax) {
    let searchParameterOfDate = ``
    if (date)
    {
        let fromDatetime = date.split("-").map(str => parseInt(str, 10))
        searchParameterOfDate = `_${minOrMax}%3A${fromDatetime[1]}%2F${fromDatetime[2]}%2F${fromDatetime[0]}%2Ccd`
    }

    return searchParameterOfDate
}
