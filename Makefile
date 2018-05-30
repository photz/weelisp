closure=./node_modules/google-closure-compiler/cli.js
standard=./node_modules/standard/bin/cmd.js

typecheck:
	$(closure) --checks-only \
	--dependency_mode=STRICT \
	--module_resolution=NODE \
	-W verbose \
	--entry_point index.js \
	--js=tokenizer.js \
	--js=tokens.js \
	--js=parse.js \
	--js='node_modules/immutable/dist/immutable.js' \
	--js='node_modules/immutable/package.json' \
	--process_common_js_modules \
	index.js

watch:
	find -maxdepth 1 -name '*.js' \
	| grep -v '#' \
	| entr node index.js

lint:
	$(standard) --fix index.js

test:
	find -maxdepth 1 -name '*.js' \
	| grep -v '#' \
	| entr node test.js
