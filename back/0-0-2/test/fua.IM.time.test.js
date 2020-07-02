module.exports = ({
                      'context':               context,
                      'assert':                assert,
                      'assert_out':            assert_out = true,
                      'assert_successful_out': assert_successful_out = true,
                      'assert_throw_on_false': assert_throw_on_false = true
                  }) => {

    let
        scope,
        //
        input_1,
        input_2,
        input_3,
        //operator inputs
        i,
        j,
        //
        comment = "",
        assert_expected_result,
        //
        placeholder,
        parameter
    ;
    const
        trs     = context['$trs'],
        time    = context['time'],
        scopes  = {
            'test':    {
                'name': "test",
                'dop':  false
            },
            //region operators
            'Before':  {
                'name': "Before",
                'dop':  true
            },
            //endregion operators
            'Instant': {
                'name': "Instant",
                'dop':  false
            }
        }
    ;
    //assert_throw_on_false = true;

    //region fn
    function buildTemporalEntities(i, j) {
        let _i, _j;
        if (i.length > 1) {
            _i = new context['time']['Interval']({
                'p': {
                    '@id':       `${trs['@id']}/${i[0]}---${i[1]}`,
                    'nb':        [trs['@id'], `${i[0]}---${i[1]}`],
                    'nd':        `${i[0]}---${i[1]}`,
                    'trs':       trs,
                    'beginning': i[0],
                    'end':       i[1]
                }
            });
        } else {
            _i = new context['time']['Instant']({
                'p': {
                    '@id':      `${trs['@id']}/${i[0]}Y`,
                    'nb':       [trs['@id'], `${i[0]}`],
                    'nd':       `${i[0]}}`,
                    'trs':      trs,
                    'dateTime': i[0]
                }
            });
        } // if ()
        if (j.length > 1) {
            _j = new context['time']['Interval']({
                'p': {
                    '@id':       `${trs['@id']}/${j[0]}---${j[1]}`,
                    'nb':        [trs['@id'], `${j[0]}---${j[1]}`],
                    'nd':        `${j[0]}---${j[1]}`,
                    'trs':       trs,
                    'beginning': j[0],
                    'end':       j[1]
                }
            });
        } else {
            _j = new context['time']['Instant']({
                'p': {
                    '@id':      `${trs['@id']}/${j[0]}Y`,
                    'nb':       [trs['@id'], `${j[0]}`],
                    'nd':       `${j[0]}}`,
                    'trs':      trs,
                    'dateTime': j[0]
                }
            });
        } // if ()
        return {'_i': _i, '_j': _j};
    } // buildTemporalProperties()

    function operantWrapper(scope, placeholder, i, j, expectedResult, succesfulOut, throwOnFalse) {
        let {_i, _j} = buildTemporalEntities(i, j);
        assert(`time.${scope.name}(${assert.toString(i)}, ${assert.toString(j)})`, placeholder(_i, _j)['@value'], expectedResult, succesfulOut, /** comment */ "", throwOnFalse);
    }

    //endregion fn

    if (scopes["test"]['dop']) {
        scope                  = scopes["test"];
        input_1                = 42;
        assert_expected_result = false;
        placeholder            = () => {
            return true;
        };
        parameter              = null;
        assert(`time.${scope.name}(${assert.toString(input_1)})`, placeholder(), assert_expected_result, assert_successful_out, comment, assert_throw_on_false);
    } // if ()

    if (scopes["Instant"]['dop']) {
        scope                  = scopes["Instant"];
        input_1                = 42;
        assert_expected_result = false;
        placeholder            = () => {
            return true;
        };
        parameter              = null;
        assert(`time.${scope.name}(${assert.toString(input_1)})`, placeholder(), assert_expected_result, assert_successful_out, comment, assert_throw_on_false);
    } // if ()

    if (scopes["Before"]['dop']) {

        scope       = scopes["Before"];
        placeholder = time['Before'];

        operantWrapper(scope, placeholder,["2019-01-01T00:00:00Z"], ["2019-01-02T00:00:00Z"], true, assert_successful_out, assert_throw_on_false);
        operantWrapper(scope, placeholder,["2019-01-02T00:00:00Z"], ["2019-01-01T00:00:00Z"], false, assert_successful_out, assert_throw_on_false);

        operantWrapper(scope, placeholder,["2019-01-01T00:00:00Z"], ["2019-01-02T00:00:00Z", "2019-01-03T00:00:00Z"], true , assert_successful_out, assert_throw_on_false);
        operantWrapper(scope, placeholder,["2019-01-04T00:00:00Z"], ["2019-01-02T00:00:00Z", "2019-01-03T00:00:00Z"], false , assert_successful_out, assert_throw_on_false);

        operantWrapper(scope, placeholder,["2019-01-01T00:00:00Z", "2019-01-01T01:00:00Z"], ["2019-01-02T00:00:00Z", "2019-01-03T00:00:00Z"], true , assert_successful_out, assert_throw_on_false);

    } // if ()

    let grunz;
};