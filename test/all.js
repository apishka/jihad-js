!function ()
{
    var Module = {};
    
    JihadCore.blockRegister(
        $.extend(
            Module,
            JihadBlock,
            {
                /**
                 * Returns block selector
                 */
                
                getSelector: function ()
                {
                    return '.block1';
                },
                
                /**
                 * Returns block bindins
                 */
                
                getBindings: function (block)
                {
                    var self = this;
                    
                    return [
                        [
                            'some-event',
                            function (e, data)
                            {
                                /* Emitter
                                 ================================================== */
                                
                                describe(
                                    "Difference events", function ()
                                    {
                                        it(
                                            "__jihadSelector", function ()
                                            {
                                                expect(e.__jihadSelector).toBe('.block1');
                                            }
                                        );
                                    }
                                );
                            }
                        ]
                    ];
                },
                
                initialize: function (block)
                {
                    var self = this;
                    
                    /* Get selectors
                     ================================================== */
                    
                    describe(
                        "Get selectors", function ()
                        {
                            it(
                                ".getSelector", function ()
                                {
                                    expect(self.getSelector()).toBe('.block1');
                                }
                            );
                            
                            it(
                                ".sel", function ()
                                {
                                    expect(self.sel()).toBe('.block1');
                                }
                            );
                            
                            it(
                                ".el", function ()
                                {
                                    expect(self.el()).toBe(block);
                                }
                            );
                            
                            it(
                                "Child", function ()
                                {
                                    expect(self.sel('child')).toBe('.block1-child');
                                }
                            );
                            
                            it(
                                "Child element", function ()
                                {
                                    expect(self.el('child')).toBe(block.find('.block1-child'));
                                }
                            );
                        }
                    );
                    
                    
                    /* Emitter
                     ================================================== */
                    
                    setTimeout(
                        function ()
                        {
                            self.emit('some-event', 'some-data');
                        },
                        1
                    )
                }
            }
        )
    );
}();

/* Block2
 ================================================== */

!function ()
{
    var Module = {};
    
    JihadCore.blockRegister(
        $.extend(
            Module,
            JihadBlock,
            {
                /**
                 * Returns block selector
                 */
                
                getSelector: function ()
                {
                    return '.block2';
                },
                
                /**
                 * Returns block bindins
                 */
                
                getBindings: function ()
                {
                    var self = this;
                    
                    return [
                        [
                            'some-event',
                            function (e, data)
                            {
                                /* Emitter
                                 ================================================== */
                                
                                describe(
                                    "Catch event", function ()
                                    {
                                        it(
                                            "Type some-event", function ()
                                            {
                                                expect(e.type).toBe('some-event');
                                            }
                                        );
                                        
                                        it(
                                            "Some-data", function ()
                                            {
                                                expect(data).toBe('some-data');
                                            }
                                        );
                                        
                                        it(
                                            "Difference events", function ()
                                            {
                                                expect(e.__jihadSelector).toBe('.block2');
                                            }
                                        );
                                    }
                                );
                            }
                        ]
                    ];
                },
                
                initialize: function ()
                {
                }
            }
        )
    );
}();

/* Block 3
 ================================================== */

!function ()
{
    var Module = {};
    
    JihadCore.blockRegister(
        $.extend(
            Module,
            JihadBlock,
            {
                /**
                 * Returns block selector
                 */
                
                getSelector: function ()
                {
                    return '.block3';
                },
                
                /**
                 * Returns block bindins
                 */
                
                getBindings: function ()
                {
                    var self = this;
                    
                    return [
                        [
                            'input',
                            '> input',
                            function ()
                            {
                                console.log(self.model().get(), self.sel());
                            }
                        ]
                    ];
                },
                
                initialize: function ()
                {
                    var self = this;
                    
                    JihadModel.init(this);
                    
                    /* Model
                     ================================================== */
                    
                    this.model().set('varName1', 'value');
                    
                    describe(
                        "Get model", function ()
                        {
                            var foo;
                            
                            beforeEach(
                                function ()
                                {
                                    foo = self.model().get()
                                }
                            );
                            
                            it(
                                "Properly objects", function ()
                                {
                                    expect(foo).toEqual(
                                        jasmine.objectContaining(
                                            {
                                                varName1: "value"
                                            }
                                        )
                                    );
                                }
                            );
                            
                            it(
                                'Get item', function ()
                                {
                                    expect(self.model().get('varName1')).toBe('value');
                                }
                            )
                        }
                    );
                    
                    describe(
                        "Model apply", function ()
                        {
                            self.model().apply();
                            
                            it(
                                'In input of node', function ()
                                {
                                    expect(self.el().find('input' + self.sel('model')).val()).toBe('value');
                                }
                            );
                            
                            it(
                                'In block of node like text', function ()
                                {
                                    expect(self.el().find('h3' + self.sel('model')).text()).toBe('value');
                                }
                            )
                        }
                    );
                }
            }
        )
    );
}();

/* Block4
 ================================================== */

!function ()
{
    var Module = {};
    
    JihadCore.blockRegister(
        $.extend(
            Module,
            JihadBlock,
            {
                /**
                 * Returns block selector
                 */
                
                getSelector: function ()
                {
                    return '.block4';
                },
                
                /**
                 * Returns block bindins
                 */
                
                getBindings: function ()
                {
                    var self = this;
                    
                    return [
                        [
                            'input',
                            '> input',
                            function ()
                            {
                                //console.log(self.model().get(), self.sel());
                            }
                        ],
                        
                        [
                            'model:change',
                            function (e, key, old_value, value)
                            {
                                console.log(key === 'varName2');
                                console.log(old_value === 'Model was replace');
                                console.log(value === 'Button click updated the value');
                            }
                        ],
                        
                        [
                            'model:applied',
                            function (e)
                            {
                                console.log('two output above must be false');
                                console.log(e.type === 'model:applied');
                            }
                        ],
                        
                        [
                            'click',
                            this.sel('change-data'),
                            function ()
                            {
                                self.model().set('varName2', 'Button click updated the value');
                            }
                        ],
                        
                        [
                            'click',
                            this.sel('change-data-unobtrusive'),
                            function ()
                            {
                                self.model(
                                    {
                                        varName2: 'Data set unobtrusive'
                                    }
                                ).apply();
                            }
                        ]
                    ];
                },
                
                initialize: function ()
                {
                    var self = this;
                    
                    JihadModel.init(this);
                    
                    describe(
                        "Model replace", function ()
                        {
                            window.newModel = {varName2: 'Value was set'};
                            self.model(window.newModel).apply();
                            
                            var foo;
                            
                            beforeEach(
                                function ()
                                {
                                    foo = self.model().get()
                                }
                            );
                            
                            self.model({varName2: 'Model was replace'}).apply();
                            
                            it(
                                "Properly objects", function ()
                                {
                                    expect(window.newModel).toEqual(
                                        jasmine.objectContaining({varName2: 'Value was set'})
                                    );
                                }
                            );
                        }
                    );
                    
                    describe(
                        "Model format data", function ()
                        {
                            it(
                                "To URL params", function ()
                                {
                                    expect(self.model().toParams()).toBe('varName2=Model%20was%20replace');
                                }
                            );
                            
                            it(
                                "To JSON", function ()
                                {
                                    expect(self.model().serialize()).toBe('{"varName2":"Model was replace"}');
                                }
                            );
                        }
                    );
                }
            }
        )
    );
}();

/* Block modifier
================================================== */

!function()
{
    var Module   = {};
    
    JihadCore.blockRegister(
        $.extend(
            Module,
            JihadBlock,
            {
                /**
                 * Returns block selector
                 */
                
                getSelector: function ()
                {
                    return '.block-mod';
                },
                
                /**
                 * Returns block bindins
                 */
                
                getBindings: function (block)
                {
                    var self = this;
                    
                    return [];
                },
                
                uppercase: function(value)
                {
                    return value.toUpperCase();
                },
    
                other: function(value)
                {
                    return $('<h4/>').text(value.toUpperCase());
                },
                
                initialize: function(block)
                {
                    JihadModel.init(this);
                    
                    this.model().set('myTitle', 'The text modified, was uppercase')
                },
                
                finalize: function()
                {
                    var self = this;
                    describe(
                        "Model modifier", function ()
                        {
                            it(
                                "|uppercase", function ()
                                {
                                    expect(self.el('model').attr('title')).toBe('THE TEXT MODIFIED, WAS UPPERCASE');
                                }
                            );
                        }
                    );
                }
            }
        )
    );
}()

/* Block5
 ================================================== */

!function ()
{
    var Module = {};
    
    JihadCore.blockRegister(
        $.extend(
            Module,
            JihadBlock,
            {
                /**
                 * Returns block selector
                 */
                
                getSelector: function ()
                {
                    return '.block5';
                },
                
                /**
                 * Returns block bindins
                 */
                
                getBindings: function ()
                {
                    return [];
                },
                
                initialize: function ()
                {
                    JihadModel.init(this);
                }
            }
        )
    );
}();

/* block-chain
================================================== */

!function()
{
    var Module   = {};
    
    JihadCore.blockRegister(
        $.extend(
            Module,
            JihadBlock,
            {
                /**
                 * Returns block selector
                 */
                
                getSelector: function ()
                {
                    return '.block-chain';
                },
                
                /**
                 * Returns block bindins
                 */
                
                getBindings: function (block)
                {
                    var self = this;
                    
                    return [];
                },
                
                initialize: function(block)
                {
                    JihadModel.init(this);
    
                    this.model()
                        .set('name', 'Use chain for model')
                        .set('description', 'Was successfully');
                },
    
                finalize: function ()
                {
                    var self = this;
                    describe(
                        "Model chains", function ()
                        {
                            it(
                                "chain 1", function ()
                                {
                                    expect(self.el('model[data-model="text:name"]').text()).toBe('Use chain for model')
                                }
                            );
                            it(
                                "chain 2", function ()
                                {
                                    expect(self.el('model[data-model="text:description"]').text()).toBe('Was successfully')
                                }
                            );
                        }
                    );
                }
            }
        )
    );
}()