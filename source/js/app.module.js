// Group filters in a module
angular.module('klimaatneutraal.filters', []);

// Group directives in a module
angular.module('klimaatneutraal.directives', []);

// Group factories in a module
angular.module('klimaatneutraal.factories', []);

// Group services in a module, with a dependency on factories
angular.module('klimaatneutraal.services', ['klimaatneutraal.factories']);

// Group controllers in a module, with a dependency on services
angular.module('klimaatneutraal.controllers', ['klimaatneutraal.services']);

//Define your app module. This is where it all starts.
angular.module('klimaatneutraal', [
    'ui.router',

    'klimaatneutraal.filters',
    'klimaatneutraal.directives',
    'klimaatneutraal.controllers',
    'klimaatneutraal.services',
])

.run([
    '$rootScope',
    '$state',
        function($rootScope, $state) {

        }
    ]
);
