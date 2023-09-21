Feature: Zip contains Image Service API Testing
    As an Anonymous user,
    I want to attach a zip file containing multiple images
    Each of these uploaded images to have a permanent link.

    Scenario: 01 I get a list of permanent links when attach a Zip file containing multiple same image file type
        Given I make a 'POST' request to '/api/zip' with a Zip file contains multiple image files in same type
        When I execute the '/api/zip' API and receive the response
        Then I expect response should have status 200
        And the response should have a json schema '{"image": "string[]"}'
        And all links in response are in the correct format link
        And total links in response equal with total image files in Zip file
        And all images ID in the response are valid UUID 'v4'

    Scenario: 02 I get a list of permanent links when attach a Zip file containing multiple image files with different types
        Given I make a 'POST' request to '/api/zip' with a Zip file contains multiple image files with different types
        When I execute the '/api/zip' API and receive the response
        Then I expect response should have status 200
        And the response should have a json schema '{"image": "string[]"}'
        And all links in response are in the correct format link
        And total links in response equal with total image files in Zip file
        And all images ID in the response are valid UUID 'v4'

    Scenario: 03 I get a list of permanent links when attach a Zip file containing a lot of image files
        Given I make a 'POST' request to '/api/zip' with a Zip file contains 100 image files
        When I execute the '/api/zip' API and receive the response
        Then I expect response should have status 200
        And the response should have a json schema '{"image": "string[]"}'
        And all links in response are in the correct format link
        And total links in response equal with total image files in Zip file
        And all images ID in the response are valid UUID 'v4'

    Scenario: 04 I get a list of permanent links when attach a Zip file containing file that is not in image format
        Given I make a 'POST' request to '/api/zip' with a Zip file contains file that is not in image format
        When I execute the '/api/zip' API and receive the response
        Then I expect response should have status 200
        And the response should have a json schema '{"image": "string[]"}'
        And all links in response are in the correct format link
        And all links in response are image type
        And total links in response less than total image files in Zip file
        And all images ID in the response are valid UUID 'v4'

    Scenario: 05 I receive the error when attach a Zip file that all files inside are not image
        Given I make a 'POST' request to '/api/zip' with a Zip file that all files inside are not image
        When I execute the '/api/zip' API and receive the response
        Then I expect response should have status 400
        And the response should have a json schema '{"err": "string"}'
        And the error in response message should be "no image found in zip file"

    Scenario: 06 I receive the error when attach a Zip file that have nothing inside
        Given I make a 'POST' request to '/api/zip' with a Zip file that have nothing inside
        When I execute the '/api/zip' API and receive the response
        Then I expect response should have status 400
        And the response should have a json schema '{"err": "string"}'
        And the error in response message should be "no image found in zip file"

    Scenario: 07 I receive the error when attach a file that is not a zip file
        Given I make a 'POST' request to '/api/zip' with a file that is not a zip file
        When I execute the '/api/zip' API and receive the response
        Then I expect response should have status 403
        And the response should have a json schema '{"err": "string"}'
        And the error in response message should be "File isn' a zip"

    Scenario: 08 I receive the error when request to Service without attach any zip file
        Given I make a 'POST' request to '/api/zip' without attach any zip file
        When I execute the '/api/zip' API and receive the response
        Then I expect response should have status 400
        And the response should contains 'Error'

    Scenario: 09 I receive the error when upload multiple zip files
        Given I make a 'POST' request to '/api/zip' with 2 zip files
        When I execute the '/api/zip' API and receive the response
        Then I expect response should have status 400
        And the response should contains 'Error'

    Scenario: 10 I receive the error when upload the valid zip file to wrong end point
        Given I make a 'POST' request to '/api/zip/invalid-endpoint' with a valid zip file
        When I execute the '/api/zip/invalid-endpoint' API and receive the response
        Then I expect response should have status 404
        And the response should contains 'Error'