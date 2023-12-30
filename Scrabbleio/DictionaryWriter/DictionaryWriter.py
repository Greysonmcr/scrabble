def dictionaryWriter() :
    input_file = 'dictionary.txt'
    output_file = 'output.txt'

    # Read the content of the input file
    with open(input_file, 'r') as f:
        lines = f.readlines()

    # Modify the lines by adding quotes and commas
    modified_lines = ['"' + line.strip() + '",' for line in lines]

    # Write the modified content to the output file with a newline every five lines
    with open(output_file, 'w') as f:
        for idx, modified_line in enumerate(modified_lines, start=1):
            f.write(modified_line)
            if idx % 5 == 0:  # Add a newline after every 5 lines
                f.write('\n')

    print("File transformation complete with new lines after every five lines.")
