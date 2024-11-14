#!/bin/bash

# Process YML_ variables
env | grep '^YML_' | while IFS='=' read -r name value; do
    new_name=${name#YML_}
    export $new_name=\"$value\"
done

# Write VONAGE_ variables to .env
env | grep '^VONAGE_' > .env